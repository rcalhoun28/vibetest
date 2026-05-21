import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const LENGTHS = {
  brief: 400,
  standard: 750,
  extended: 1200,
  comprehensive: 2000,
};

const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
};

function loadEnv() {
  try {
    const envPath = path.join(__dirname, ".env");
    const text = fs.readFileSync(envPath, "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  } catch {
    /* no .env file */
  }
}

loadEnv();

const SYSTEM_PROMPT = (wordTarget) => `You are an expert academic essayist writing at the college and graduate level.

Write a rigorous analytical essay that demonstrates DEEP SYNTHESIS—not a list of facts or a shallow overview.

Requirements:
- Open with a precise, arguable thesis that takes a clear position on the topic
- Organize body paragraphs around conceptual claims (topic sentences), not chronology alone
- Synthesize multiple lenses: theoretical frameworks, competing viewpoints, historical context, implications, and tensions between ideas
- Weave ideas together: show how concepts relate, contradict, and inform one another
- Use sophisticated vocabulary and formal academic tone without jargon for its own sake
- Include concrete examples, evidence, or illustrative cases where they strengthen the argument
- Address counterarguments or limitations where relevant
- Conclude by synthesizing insights into broader significance—do not merely repeat the introduction
- Write in continuous prose paragraphs only. No bullet points, numbered lists, or section headers.
- Target approximately ${wordTarget} words

The essay must read as original scholarly writing suitable for an upper-division college course.`;

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function sendJson(res, status, obj) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(obj));
}

function serveStatic(req, res) {
  let filePath = req.url.split("?")[0];
  if (filePath === "/") filePath = "/index.html";
  const safePath = path.normalize(filePath).replace(/^(\.\.[/\\])+/, "");
  const fullPath = path.join(__dirname, safePath);

  if (!fullPath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(fullPath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
}

async function handleEssay(req, res) {
  let body;
  try {
    body = JSON.parse(await readBody(req));
  } catch {
    sendJson(res, 400, { error: "Invalid request body." });
    return;
  }

  const apiKey = body.apiKey || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    sendJson(res, 400, {
      error: "No API key. Add one in the field below, or create a .env file with OPENAI_API_KEY=sk-...",
    });
    return;
  }

  const { prompt, length = "standard" } = body;
  if (!prompt || prompt.trim().length < 10) {
    sendJson(res, 400, { error: "Please provide a more detailed prompt." });
    return;
  }

  const wordTarget = LENGTHS[length] || LENGTHS.standard;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        stream: true,
        temperature: 0.7,
        messages: [
          { role: "system", content: SYSTEM_PROMPT(wordTarget) },
          {
            role: "user",
            content: `Write a college-level essay on the following topic:\n\n${prompt.trim()}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      sendJson(res, response.status, {
        error: err.error?.message || `OpenAI error (${response.status})`,
      });
      return;
    }

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6).trim();
        if (data === "[DONE]") {
          res.write("data: [DONE]\n\n");
          continue;
        }
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
          }
        } catch {
          /* skip */
        }
      }
    }

    res.end();
  } catch (err) {
    console.error(err);
    sendJson(res, 500, { error: "Server error. Is the server running and your API key valid?" });
  }
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/api/health") {
    sendJson(res, 200, {
      ready: Boolean(process.env.OPENAI_API_KEY),
      server: true,
    });
    return;
  }

  if (req.method === "POST" && req.url === "/api/essay") {
    await handleEssay(req, res);
    return;
  }

  if (req.method === "GET") {
    serveStatic(req, res);
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`\n  SynthWrite → http://localhost:${PORT}\n`);
  if (!process.env.OPENAI_API_KEY) {
    console.log("  Tip: Add your OpenAI key in the app, or put OPENAI_API_KEY in .env\n");
  }
});

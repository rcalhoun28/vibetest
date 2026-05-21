import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

const LENGTHS = {
  brief: 400,
  standard: 750,
  extended: 1200,
  comprehensive: 2000,
};

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

app.use(express.json());
app.use(express.static(__dirname));

app.get("/api/health", (_req, res) => {
  res.json({ ready: Boolean(process.env.OPENAI_API_KEY) });
});

app.post("/api/essay", async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: "Server missing OPENAI_API_KEY. Copy .env.example to .env and add your key.",
    });
    return;
  }

  const { prompt, length = "standard" } = req.body;
  if (!prompt || prompt.trim().length < 10) {
    res.status(400).json({ error: "Please provide a more detailed prompt." });
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
        model: "gpt-4o",
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
      res.status(response.status).json({
        error: err.error?.message || "Failed to generate essay.",
      });
      return;
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n").filter((line) => line.startsWith("data: "));

      for (const line of lines) {
        const data = line.slice(6);
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
          /* skip malformed chunks */
        }
      }
    }

    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while generating essay." });
  }
});

app.listen(PORT, () => {
  console.log(`SynthWrite running at http://localhost:${PORT}`);
});

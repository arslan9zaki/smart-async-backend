import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/ai-search", async (req, res) => {
  try {
    const { query } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a sourcing expert. Return JSON with summary, bestSupplierType, estimatedPriceRange, riskLevel, suggestedCountry, tips."
        },
        {
          role: "user",
          content: query
        }
      ],
      temperature: 0.7
    });

    const text = completion.choices[0].message.content;

    res.json(JSON.parse(text));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI failed" });
  }
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

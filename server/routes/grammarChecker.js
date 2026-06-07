const express = require("express");
const grammarCheck = express.Router();
const axios = require("axios");

grammarCheck.post("/", async (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Text is required" });
  }
  try {
    const response = await axios.post(
      "https://genai.vedshil.com/v1/chat/completions",
      {
        model: "Kryonex-G",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that checks and corrects grammar errors in the following text. Only return the corrected text without any additional comments or context.",
          },
          { role: "user", content: text },
        ],
        max_tokens: 1000,
        n: 1,
        stop: null,
        temperature: 0.3,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    const correctedText = response.data.choices[0].message.content.trim();
    res.json({ correctedText });
  } catch (error) {
    console.error("Error checking grammar:", error?.response?.data || error.message);
    res.status(500).json({ error: error?.response?.data?.error || error.message });
  }
});
module.exports = grammarCheck;

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API chạy OK 🚀");
});

app.post("/chat", async (req, res) => {
  try {
    const msg = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: msg }
        ]
      })
    });

    const data = await response.json();

    if (!data.choices) {
      return res.json({
        reply: "Lỗi API: " + JSON.stringify(data)
      });
    }

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (err) {
    res.json({ reply: "Server lỗi 😢" });
  }
});

app.listen(3000);

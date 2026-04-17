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

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: msg }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI không trả lời 😢";

    res.json({ reply });

  } catch (err) {
    res.json({ reply: "Server lỗi 😢" });
  }
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

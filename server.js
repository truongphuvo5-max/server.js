import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API chạy OK 🚀");
});

app.post("/chat", async (req, res) => {
  const msg = req.body.message;

  const response = await fetch("https://api.popcat.xyz/chatbot?msg=" + encodeURIComponent(msg));
  const data = await response.json();

  res.json({ reply: data.response });
});

app.listen(3000);

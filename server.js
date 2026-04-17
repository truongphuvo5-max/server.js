import express from "express";
import fetch from "node-fetch";
import cors from "cors";
const app = express();
app.use(cors()); 
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API chạy OK 🚀");
});
app.get("/chat", async (req, res) => {
  const msg = req.query.msg;

  const response = await fetch("https://api.popcat.xyz/chatbot?msg=" + encodeURIComponent(msg));
  const data = await response.json();

  res.send(data.response);
});
app.post("/chat", async (req, res) => {
  const msg = req.body.message;

  const response = await fetch("https://api.popcat.xyz/chatbot?msg=" + encodeURIComponent(msg));
  const data = await response.json();

  res.json({ reply: data.response });
});

app.listen(3000);

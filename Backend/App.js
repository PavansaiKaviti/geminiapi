const { GoogleGenerativeAI } = require("@google/generative-ai");
const { error } = require("console");
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const corsOption = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOption));
// Access your API key as an environment variable (see "Set up your API key" above)
app.use(express.json());
app.post("/genarator", async (req, res) => {
  try {
    const { input } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    async function run(input) {
      // For text-only input, use the gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();
      res.send(text);
    }
    run(input);
  } catch (error) {}
});

app.listen(port, () => {
  try {
    console.log(` sever connected at : http://localhost:${port}`);
  } catch (error) {
    console.log("error", error);
  }
});

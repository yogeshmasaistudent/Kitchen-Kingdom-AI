require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
app.use(cors(), express.json());

app.post("/", async (req, res) => {
  try {
    const { dish } = req.body;
    const prompt = `write the recipe for ${dish}. Firstly, give me all the ingredients required for the dish. Then, give me the instructions to cook that dish. Finally, give me any extra add-ons to add into the dish.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const responseData = {
      message: "Here is the generated recipe data",
      recipeText: text,
      dish: dish,
    };

    console.log(text);
    res.json(responseData);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while generating the recipe." });
  }
});

app.listen(3000, () => {
  console.log("Server running");
});

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.use("/api/recipes", (req, res, next) => {
  const recipes = [
    {
      _id: "fdasdfasdfa",
      title: "Pizza",
      ingredients: "Tomato sauce, pepperoni, cheese, dough",
      prepareTime: 15,
      difficulty: 5
    },
    {
      _id: "adfafsadfadsfads",
      title: "Hamburger",
      ingredients: "Beef, buns, veggies, cheese",
      prepareTime: 10,
      difficulty: 1
    }
  ];
  res.status(200).json(recipes);
});

app.post("/api/recipes", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "New recipe created"
  });
});

module.exports = app;

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.post("/api/recipes", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "recipe created successfully"
  });
});

app.use("/api/recipes", (req, res, next) => {
  const recipe = [
    {
      _id: "al;kdjf;akldsjfad",
      title: "Pizza",
      ingredients: "dough and sauce",
      instructions: "bake the pizza",
      prepareTime: 15,
      difficulty: 1
    }
  ];
  res.status(200).json(recipe);
});
module.exports = app;

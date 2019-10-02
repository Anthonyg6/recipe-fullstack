const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const Recipe = require("./recipeModel/recipe");

mongoose
  .connect(
    "mongodb+srv://AnthonyGallegos:n6hVxRAmH9r6uYg7@cluster0-roxtp.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch(error => {
    console.log("Dang cannot connect to atlas =(");
    console.error(error);
  });

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
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    time: req.body.time,
    difficulty: req.body.difficulty
  });
  recipe
    .save()
    .then(() => {
      res.status(201).json({
        message: "New Recipe Posted!!"
      });
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({
        error
      });
    });
});

app.get("/api/recipes/:id", (req, res, next) => {
  Recipe.findOne({
    _id: req.params.id
  })
    .then(Recipe => {
      res.status(200).json(Recipe);
    })
    .catch(error => {
      res.status(404).json({
        error
      });
    });
});

app.use("/api/recipes", (req, res, next) => {
  Recipe.find()
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(error => {
      res.status(400).json({
        error
      });
    });
});
module.exports = app;

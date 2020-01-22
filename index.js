// Pack pour express, et les Bdd
const express = require("express");
const app = express();
const formidableMiddleWare = require("express-formidable");
const mongoose = require("mongoose");
app.use(formidableMiddleWare());

mongoose.connect("mongodb://localhost/leboncoin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const userRoutes = require("./routes/user");
const publicationsRoutes = require("./routes/publications");
app.use(userRoutes);
app.use(publicationsRoutes);

// Gestion des routes fausses
app.all("*", function(req, res) {
  res.json({ message: "all routes" });
});

// Ecoute du serveur
app.listen(3000, () => {
  console.log("Server has started");
});

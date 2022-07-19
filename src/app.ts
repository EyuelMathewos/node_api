import express from 'express';
const app = express();
const path = require('path');

app.get("/", (req, res) => { 
  res.send("Exporess is working"); 
});

module.exports = app;
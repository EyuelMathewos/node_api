import express from 'express';
import registerRouter from './routes/userRouter'




const app = express();
const path = require('path');


app.get("/", (req, res) => {
  res.send("Express is working");
});

app.use(express.json());
app.use("/api/v1/register", registerRouter);

module.exports = app;
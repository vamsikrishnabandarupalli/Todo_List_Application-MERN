const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const auth = require("./routes/auths");
const list = require("./routes/list");
app.use(express.json());
app.use(cors());

// Connect to MongoDB
try {
  mongoose.connect('mongodb+srv://vamsikrishna2706:vamsi2706@cluster0.tlill.mongodb.net/').then(() => {
      console.log('Connected to database')
  });
} catch (error) {
  console.error('Database connection failed:', error);
}


app.use("/api/auths", auth);
app.use("/api/list", list);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(1000, () => {
  console.log("Server Started");
});
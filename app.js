// Basic 
const express = require('express');
const router = require("./src/routes/api");
const app = new express();
const bodyParser = require('body-parser');


// Security Middleware 
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Database

const mongoose = require('mongoose');


// Security Middleware Implement 
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());


// Body Parser Implement
app.use(bodyParser.json());

// Rate Limit Implement
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });

app.use(limiter);

// DataBase Connection 

let URL = "mongodb+srv://compassAdmin2:nXw7lwGEQqL2TVGl@cluster0.bpilnp1.mongodb.net/Todo";
let Option = { autoIndex: true };

mongoose.connect(URL, Option)
  .then(() => {
    console.log('Mongoose Connected');
  })
  .catch((e) => {
    console.log(e);
  });


// Routing Implement 
app.use("/api/v1", router);

// Undefined Route Implement 
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" });
})

module.exports = app;
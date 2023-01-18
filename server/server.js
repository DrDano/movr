const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const expressSession = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false
}

app.get("env") === "production" && (session.cookie.secure = true);

(async function connectMongoose() {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/movr', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on('error', err => {
      console.log(err);
    })
  } catch (err) {
    console.log(err);
  }
})()

app.use(require('./routes'));

app.use(expressSession(session));

// Use this to log mongo queries
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
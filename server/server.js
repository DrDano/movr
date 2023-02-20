const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const expressSession = require('express-session');
const { auth } = require('express-openid-connect');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {maxAge:500},
  resave: false,
  saveUninitialized: false
};

app.use(expressSession(session));

const config = {
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  secret: process.env.SESSION_SECRET,
  authRequired: false,
  idpLogout: true,
  auth0Logout: true,
  afterCallback: (req, res, session) => {
    console.log(req.session);
    return session;
  },
};

app.get("env") === "production" && (session.cookie.secure = true);

app.use(auth(config));

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.oidc.isAuthenticated();
  res.locals.activeRoute = req.oidc.originalUrl;
  next();
});

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
})();

app.use(require('./routes'));

// Use this to log mongo queries
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on http://localhost:${PORT}`));
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const expressSession = require('express-session');
const { auth } = require('express-openid-connect');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false
};

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET,
  baseURL: 'http://localhost:3000/',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL
  },
  
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);

app.get("env") === "production" && (session.cookie.secure = true);

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(expressSession(session));
app.use(auth(config));

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
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
//const path = require('path')
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const port = 3000;
const hostname = "127.0.0.1";
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const generateDate = require("./helpers/generateDate").generateDate;
const limit = require("./helpers/limit").limit
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const methodOverride = require('method-override')

mongoose.connect(
  "mongodb://127.0.0.1/nodeblog_db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to Database");
  }
);
const mongoStore = connectMongo(expressSession);

app.use(
  expressSession({
    secret: "test",
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(fileUpload());

app.use(express.static("public"));
app.use(methodOverride('_method'))

//handlebars helpers


const  hbs = exphbs.create({
  helpers: {
    generateDate:generateDate,
    limit:limit
  }
})

app.engine("handlebars",hbs.engine)
app.set("view engine", "handlebars");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    res.locals = {
      displayLink: true,
    };
  } else {
    res.locals = {
      displayLink: false,
    };
  }
  next()
});

const main = require("./routes/main");
app.use("/", main);

const posts = require("./routes/posts");
app.use("/posts", posts);

const users = require("./routes/users");
app.use("/users", users);

const admin = require('./routes/admin/index')
app.use('/admin',admin)

const contact = require("./routes/contact")
app.use("/contact",contact)

app.listen(port, hostname, () => {
  console.log(` Server Calısıyor, http://${hostname}:${port}/`);
});
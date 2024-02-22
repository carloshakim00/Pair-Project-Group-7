const express = require('express');
const session = require('express-session');
const router = require("./Routers")
const app = express()
const port = 3000

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(router)
app.use(
  session({
    secret: "keyboard cat", // harus ada
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, //https
      sameSite: true, // untuk security dari csrf attack
    },
  })
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
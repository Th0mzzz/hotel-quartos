const express = require("express");
const session = require("express-session")
const app = express();
const env = require("dotenv").config();
const port = process.env.APP_PORT;
app.use((session({
  secret: "HotelSession",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
})));
app.use(express.static("app/public"));

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var rotas = require("./app/routes/router");
app.use("/", rotas);

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}\nhttp://localhost:${port}`);
});

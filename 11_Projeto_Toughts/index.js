const express = require("express")
const exphbs = require("express-handlebars")
const session = require("express-session")
const FileStore = require("session-file-store")(session)
const flash = require("express-flash")

const app = express()

//importando a conexão com banco
const conn = require("./db/conn")

//Models
const Tought = require("./models/Tought")
const User = require(`./models/User`)

//definindo a template engine
app.engine("handlebars", exphbs())
app.set("view engine", "handlebars")

//recebendo resposta do body
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

//session middleware - diz onde o express irá salvar as sessões
app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  }),
)

//Flash messages
app.use(flash())

//public path
app.use(express.static("public"))

//set session to res - resposta da sessão
app.use((req, res, next) => {
  // console.log(req.session)
  console.log(req.session.userid)

  if (req.session.userid) {
    res.locals.session = req.session
  }

  next()
})

//chamada da aplicação
conn
  .sync()
  //  .sync({ force: true })
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))

const express = require(`express`)
const exphbs = require(`express-handlebars`)

const app = express()

const conn = require(`./db/conn`)

//Models
const Task = require(`./models/Task`)

//Routes
const taskRoutes = require(`./routes/tasksRoutes`)

// 1. Configurar o motor de templates
app.engine(`handlebars`, exphbs())
app.set(`view engine`, `handlebars`)

// 2. Configurar arquivos estáticos
app.use(express.static(`public`))

// 3. COLOCAR OS PARSERS DE BODY AQUI (ANTES DAS ROTAS)
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

// 4. Só agora registrar as rotas que dependem do req.body
app.use(`/tasks`, taskRoutes)

conn
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))

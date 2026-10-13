const express = require(`express`)
const exbhbs = require(`express-handlebars`)
const conn = require(`./db/conn`)

const User = require(`./models/User`)

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.engine(`handlebars`, exbhbs())
app.set(`view engine`, `handlebars`)

app.use(express.static(`public`))

//criação da rota da home
app.get(`/`, (req, res) => {
  res.render(`home`)
})

conn
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))

//com o uso do connection POOL, os dados para conexão são registrados em outra instância da estrutura de diretórios.

// //declaração da variável de conexão com o banco
// const conn = mysql.createConnection({
//   host: `localhost`,
//   user: `root`,
//   password: ``,
//   database: `nodemysql`,
// })

// //método para iniciar a conexão com o banco passando o objeto criado como argumento
// conn.connect(function (err) {
//   if (err) {
//     console.log(err)
//   }

//   console.log(`Conectou ao MySql!`)

// })

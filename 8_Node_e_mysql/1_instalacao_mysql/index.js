const express = require(`express`)
const exbhbs = require(`express-handlebars`)
const mysql = require(`mysql`)

const app = express()

app.engine(`handlebars`, exbhbs())
app.set(`view engine`, `handlebars`)

app.use(express.static(`public`))

app.get(`/`, (req, res) => {
  res.render(`home`)
})

const conn = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: ``,
  database: `nodemysql`,
})

conn.connect(function (err) {
  if (err) {
    console.log(err)
  }

  console.log(`Conectou ao MySql!`)

  app.listen(3000)
})

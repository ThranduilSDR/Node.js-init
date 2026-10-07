const express = require("express")
const exphbs = require("express-handlebars")

const app = express()

app.engine(`handlebars`, exphbs())
app.set(`view engine`, `handlebars`)

app.get(`/dashboard`, (req, res) => {
  res.render(`dashboard`)
})

app.get(`/`, (req, res) => {
  const user = {
    name: `Thranduil`,
    surname: `Sindar`,
    age: `1627`,
  }

  const palavra = `The Lord of The Rings`

  const auth = true

  res.render(`home`, { user: user, palavra, auth })
})

app.listen(3000, () => {
  console.log(`App funcionando!`)
})

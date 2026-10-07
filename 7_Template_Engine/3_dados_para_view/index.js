const express = require("express")
const exphbs = require("express-handlebars")

const app = express()

app.engine(`handlebars`, exphbs())
app.set(`view engine`, `handlebars`)

app.get(`/`, (req, res) => {
  const user = {
    name: `Thranduil`,
    surname: `Sindar`,
    age: `1627`,
  }

  const palavra = `The Lord of The Rings`
  res.render(`home`, { user: user, palavra })
})

app.listen(3000, () => {
  console.log(`App funcionando!`)
})

// acesso via browser
const express = require("express")
const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

//Rotas - Endpoints

//chamada da rota / {POST}
app.post("/createproduct", (req, res) => {
  const name = req.body.name
  const price = req.body.price

  if (!name) {
    res.status(422).json({ message: `O campo nome precisa ser enviado!` })
    return
  }

  console.log(name)
  console.log(price)

  res
    .status(201)
    .json({ message: `O produto: ${name} foi criado com sucesso!` })
})

//chamada para retorno da rota / {GET} com json ao invés de render
app.get("/", (req, res) => {
  res.status(200).json({ message: "Primeira rota criada com sucesso!" })
})

app.listen(3000)

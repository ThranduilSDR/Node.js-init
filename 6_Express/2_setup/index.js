const express = require("express")

const app = express()

const port = 3000 // variavel de ambiente

app.get("/", (req, res) => {
  res.send("Olá, Mundo!")
})

app.listen(port, () => {
  console.log(`Aplicação está rodando na porta ${port}`)
})

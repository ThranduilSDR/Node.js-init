const express = require("express")
const app = express()
const port = 5000 // variavel de ambiente

const projectsRoutes = require(`./projects`)

app.use(express.static("public"))

app.use(`/projects`, projectsRoutes)

app.listen(port, () => {
  console.log(`Aplicação está rodando na porta ${port}`)
})

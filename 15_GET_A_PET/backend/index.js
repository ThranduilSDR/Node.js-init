const express = require(`express`)
const cors = require(`cors`)

const app = express()

// Importando o Swagger
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")

// Configurando a rota da documentação
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//config JSON response
app.use(express.json())

//solve CORS
app.use(cors({ credentials: true, origin: `http://localhost:3000` }))

// Public folder for images
app.use(express.static(`public`))

//Routes
const UserRoutes = require(`./routes/UserRoutes`)

app.use("/users", UserRoutes)

app.listen(5000)

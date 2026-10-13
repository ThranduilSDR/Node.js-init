const express = require(`express`)
const exbhbs = require(`express-handlebars`)
const conn = require(`./db/conn`)

const User = require(`./models/User`)
const Address = require(`./models/Address`)

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

//criando rota de cadastrar usuário
app.get(`/users/create`, (req, res) => {
  res.render(`adduser`)
})

//Rota para criar o insert de dados, preimeiro o POST na URL e método Create herdado do sequelize

app.post(`/users/create`, async (req, res) => {
  const name = req.body.name
  const occupation = req.body.occupation
  //utilizar let ao inves de contraint pois o valor pode ser alterado dependendo do que chega da req
  let newsletter = req.body.newsletter

  if (newsletter === `on`) {
    newsletter = true
  } else {
    newsletter = false
  }

  console.log(req.body)

  await User.create({ name, occupation, newsletter })

  res.redirect(`/`)
})

//Criando rota URL dinamica e código para consultar um registro,
//utilizar o raw junto ao método FindOne para trazer o array apenas com os dados necessários
app.get(`/users/:id`, async (req, res) => {
  const id = req.params.id

  const user = await User.findOne({ raw: true, where: { id: id } })

  res.render(`userview`, { user })
})

//Criando rota e código para deletar dado - assincrono para aguardar a exclusão e redirecionar
app.post(`/users/delete/:id`, async (req, res) => {
  const id = req.params.id

  await User.destroy({ where: { id: id } })

  res.redirect(`/`)
})

//Criando rota URL dinamica e código para editar um registro, que aceita um ID na url
//utilizar o raw junto ao método FindOne para trazer o array apenas com os dados necessários
//primeiro traz o registro atualizado em consulta individual por meio do GET
//em seguida cria-se um POST para passar esses dados atualizados utilizando um WHERE com ID como parametro por UPDATE
app.get(`/users/edit/:id`, async (req, res) => {
  const id = req.params.id

  const user = await User.findOne({ raw: true, where: { id: id } })

  res.render(`useredit`, { user })
})

app.post(`/users/update`, async (req, res) => {
  const id = req.body.id
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  if (newsletter === `on`) {
    newsletter = true
  } else {
    newsletter = false
  }

  const userData = {
    id,
    name,
    occupation,
    newsletter,
  }

  await User.update(userData, { where: { id: id } })

  res.redirect(`/`)
})

//criação da rota da home assincrona para carregar os usuários e apresentar
//utilizar o raw junto ao método FindOne para trazer o array apenas com os dados necessários
app.get(`/`, async (req, res) => {
  const users = await User.findAll({ raw: true })

  console.log(users)
  res.render(`home`, { users: users })
})

conn
  .sync()
  //utilizando o force indicado abaixo, serve para recriar toda a estrutura da tabela, deste modo todos os dados são apagados
  //ideal para ambiente isolado, quando se insere novos campos e relacionamentos, e deseja resetar a db
  //.sync({ force: true })
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

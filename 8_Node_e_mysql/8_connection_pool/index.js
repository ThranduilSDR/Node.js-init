const express = require(`express`)
const exbhbs = require(`express-handlebars`)
const pool = require(`./db/conn`)

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

//Cadastrar um livro, contendo seus atributos, título e quantidade de paginas
app.post(`/books/insertbook`, (req, res) => {
  const title = req.body.title
  const pageqty = req.body.pageqty

  const sql = `INSERT INTO books (title, pageqty) VALUES ("${title}", "${pageqty}")`

  pool.query(sql, function (err) {
    if (err) {
      console.log(err)
      return
    }
    res.redirect(`/books`)
  })
})

//Consultar todos os livros cadastrados
app.get(`/books`, (req, res) => {
  const sql = `SELECT * FROM books`

  pool.query(sql, function (err, data) {
    if (err) {
      console.log(err)
      return
    }
    const books = data

    console.log(books)
    res.render(`books`, { books })
  })
})

//Visualizar um livro especifico em consulta
app.get(`/books/:id`, (req, res) => {
  const id = req.params.id

  const sql = `SELECT * FROM books WHERE id = ${id}`

  pool.query(sql, function (err, data) {
    if (err) {
      console.log(err)
      return
    }
    const book = data[0]

    res.render(`book`, { book })
  })
})

//Editar um livro especifico, primeiro trazer a consulta dos dados e apresentar em tela
app.get(`/books/edit/:id`, (req, res) => {
  const id = req.params.id

  const sql = `SELECT * FROM books WHERE id = ${id}`

  pool.query(sql, function (err, data) {
    if (err) {
      console.log(err)
      return
    }
    const book = data[0]

    res.render(`editbook`, { book })
  })
})

//Editar um livro especifico, aogra passando os dados alterados no formulário trazido pelo método acima, agora utilizando o POST
app.post(`/books/updatebook`, (req, res) => {
  const id = req.body.id
  const title = req.body.title
  const pageqty = req.body.pageqty

  const sql = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`

  pool.query(sql, function (err, data) {
    if (err) {
      console.log(err)
      return
    }

    res.redirect(`/books`)
  })
})

app.post(`/books/remove/:id`, (req, res) => {
  const id = req.params.id

  const sql = `DELETE FROM books WHERE id = ${id}`

  pool.query(sql, function (err) {
    if (err) {
      console.log(err)
      return
    }
    res.redirect(`/books`)
  })
})

app.listen(3000)

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

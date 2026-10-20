const User = require("../models/User")

const bcrypt = require("bcryptjs")

module.exports = class UserController {
  static login(req, res) {
    res.render("auth/login")
  }

  //método para login de um usuário existente
  static async loginPost(req, res) {
    const { email, password } = req.body

    // find user
    const user = await User.findOne({ where: { email: email } })

    if (!user) {
      res.render("auth/login", {
        message: "Usuário não encontrado!",
      })

      return
    }

    // compare password - check if passwords match
    const passwordMatch = bcrypt.compareSync(password, user.password)

    if (!passwordMatch) {
      res.render("auth/login", {
        message: "Senha inválida!",
      })

      return
    }

    // auth user
    req.session.userid = user.id

    req.flash("message", "Login realizado com sucesso!")

    req.session.save(() => {
      res.redirect("/")
    })
  }

  //método para registro de um usuário novo

  static register(req, res) {
    res.render("auth/register")
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body

    // passwords match validation
    if (password != confirmpassword) {
      req.flash("message", "As senhas não conferem, tente novamente!")
      res.render("auth/register")

      return
    }

    // email validation - check if user exists
    const checkIfUserExists = await User.findOne({ where: { email: email } })

    if (checkIfUserExists) {
      req.flash("message", "O e-mail já está em uso!")
      res.render("auth/register")

      return
    }

    // create a password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const user = {
      name,
      email,
      password: hashedPassword,
    }

    //Criação do usuário junto ao banco por meio do sequelize
    try {
      const createdUser = await User.create(user)

      // initialize session
      req.session.userid = createdUser.id

      // console.log('salvou dado')
      // console.log(req.session.userid)

      req.flash("message", "Cadastro realizado com sucesso!")

      //salvando a sessão do usuário novo após preenchimento do cadastro para já continuar logado
      req.session.save(() => {
        res.redirect("/")
      })
    } catch (err) {
      console.log(err)
    }
  }

  ////método para sair do sistema e encerrar a sessão
  static logout(req, res) {
    req.session.destroy()
    res.redirect("/login")
  }
}

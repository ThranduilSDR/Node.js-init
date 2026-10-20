const Tought = require("../models/Tought")
const User = require(`../models/User`)

const { Op } = require("sequelize")

module.exports = class ToughController {
  static async dashboard(req, res) {
    const userId = req.session.userid

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: Tought,
      plain: true,
    })

    //check if user exists
    if (!user) {
      res.redirect(`/login`)
    }

    const toughts = user.Toughts.map((result) => result.dataValues)

    let emptyToughts = true

    if (toughts.length > 0) {
      emptyToughts = false
    }

    console.log(toughts)
    console.log(emptyToughts)

    res.render("toughts/dashboard", { toughts, emptyToughts })
  }

  static createTought(req, res) {
    res.render("toughts/create")
  }

  static async createToughtSave(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userid,
    }

    //utilizando try catch para tratar qualquer eventual erro e deixar o código linear
    try {
      await Tought.create(tought)

      req.flash("message", "Pensamento criado com sucesso!")

      req.session.save(() => {
        res.redirect("/toughts/dashboard")
      })
    } catch (err) {
      console.log(`Aconteceu um erro:` + err)
    }
  }

  static async showToughts(req, res) {
    console.log(req.query)

    // check if user is searching
    let search = ""

    if (req.query.search) {
      search = req.query.search
    }

    // order results, newest first
    let order = "DESC"

    if (req.query.order === "old") {
      order = "ASC"
    } else {
      order = "DESC"
    }

    try {
      const toughtsData = await Tought.findAll({
        include: User,
        where: {
          title: { [Op.like]: `%${search}%` },
        },
        order: [["createdAt", order]],
      })

      const toughts = toughtsData.map((result) => result.get({ plain: true }))

      let toughtsQty = toughts.length

      if (toughtsQty === 0) {
        toughtsQty = false
      }

      res.render("toughts/home", { toughts, toughtsQty, search })
    } catch (err) {
      console.log(`Aconteceu um erro:` + err)
    }
  }

  static async removeTought(req, res) {
    const id = req.body.id
    const UserId = req.session.userid

    try {
      await Tought.destroy({ where: { id: id, UserId: UserId } })

      req.flash("message", "Pensamento removido com sucesso!")

      req.session.save(() => {
        res.redirect("/toughts/dashboard")
      })
    } catch (err) {
      console.log(`Aconteceu um erro:` + err)
    }
  }

  static async updateTought(req, res) {
    const id = req.params.id

    try {
      const tought = await Tought.findOne({ where: { id: id }, raw: true })
      res.render("toughts/edit", { tought })
    } catch (err) {
      console.log(`Aconteceu um erro:` + err)
    }
  }

  static async updateToughtSave(req, res) {
    const id = req.body.id

    const tought = {
      title: req.body.title,
      description: req.body.description,
    }

    try {
      await Tought.update(tought, { where: { id: id } })

      req.flash("message", "Pensamento atualizado com sucesso!")
      req.session.save(() => {
        res.redirect("/toughts/dashboard")
      })
    } catch (err) {
      console.log(`Aconteceu um erro:` + err)
    }
  }
}

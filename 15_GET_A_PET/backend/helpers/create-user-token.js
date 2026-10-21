const jwt = require("jsonwebtoken")

const createUserToken = async (user, req, res) => {
  //create a token
  const token = jwt.sign(
    // payload data
    {
      name: user.name,
      id: user._id,
    },
    //Secret - para encriptar e deixar cada token unico, aconselhado colocar strings complexas
    "nossosecret",
  )

  // return token
  res.status(200).json({
    message: "Você está autenticado!",
    token: token,
    userId: user._id,
  })
}

module.exports = createUserToken

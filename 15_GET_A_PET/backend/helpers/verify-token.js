const jwt = require(`jsonwebtoken`)
const getToken = require(`./get-token`)

//middleware to validade token
const checktoken = (req, res, next) => {
  const token = getToken(req)

  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Acesso negado!" })
  }

  if (!token) return res.status(401).json({ message: "Acesso negado!" })

  try {
    const verified = jwt.verify(token, "nossosecret")
    req.user = verified
    next() // to continue the flow
  } catch (err) {
    res.status(400).json({ message: "O Token é inválido!" })
  }
}

module.exports = checktoken

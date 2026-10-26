const multer = require("multer")
const path = require("path")

// Destination to store image
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = ""

    console.log(req)

    //Selecionar a pasta que será salva os arquivos de imagem
    if (req.baseUrl.includes("users")) {
      folder = "users"
    } else if (req.baseUrl.includes("pets")) {
      folder = "pets"
    }
    cb(null, `public/images/${folder}/`)
  },
  //função para registar o nome das imagens - data + extensào
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        //adicionando um numero randomizado para compor o nome da image afim de que
        //não haja redundância de nomes e alguns arquivos falhem
        String(Math.floor(Math.random() * 1000)) +
        path.extname(file.originalname),
    )
  },
})

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Por favor, envie apenas png ou jpg!"))
    }
    cb(undefined, true)
  },
})

module.exports = { imageUpload }

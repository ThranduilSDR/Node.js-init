const router = require("express").Router()

const PetController = require("../controllers/PetController")

// middlewares
const verifyToken = require("../helpers/verify-token")
const { imageUpload } = require("../helpers/image-upload")

router.post(
  "/create",
  verifyToken,
  //utilizando o método de array para salvar várias imagens difernte do single
  imageUpload.array("images"),
  PetController.create,
)
router.get("/", PetController.getAll)
router.get("/mypets", verifyToken, PetController.getAllUserPets)
router.get("/myadoptions", verifyToken, PetController.getAllUserAdoptions)
router.get("/:id", PetController.getPetById)
router.delete("/:id", verifyToken, PetController.removePetById)
router.patch(
  "/:id",
  verifyToken,
  imageUpload.array("images"),
  PetController.updatePet,
)

module.exports = router

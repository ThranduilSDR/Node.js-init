const Pet = require("../models/Pet")

//helpers
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")
const ObjectId = require("mongoose").Types.ObjectId

module.exports = class PetController {
  //create a pet
  static async create(req, res) {
    //declarando variáveis  de entrada
    const { name, age, weight, color } = req.body
    const images = req.files

    //variavel que não vem do body para que o pet cadastrado esteja disponível
    const available = true

    //validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" })
      return
    }
    if (!age) {
      res.status(422).json({ message: "A idade é obrigatória!" })
      return
    }
    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório!" })
      return
    }
    if (!color) {
      res.status(422).json({ message: "A cor é obrigatória!" })
      return
    }

    //validação para que venha algum elemento no array
    if (images.length === 0) {
      res.status(422).json({ message: "A imagem é obrigatória!" })
      return
    }

    // get pet owner
    const token = getToken(req)
    const user = await getUserByToken(token)

    //create a pet
    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    })

    //recebendo os metadados das imagens e jogando no array
    images.map((image) => {
      pet.images.push(image.filename)
    })

    try {
      const newPet = await pet.save()
      res.status(201).json({
        message: "Pet cadastrado com sucesso!",
        newPet,
      })
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }
  // get all registered pets
  static async getAll(req, res) {
    const pets = await Pet.find().sort("-createdAt")

    res.status(200).json({
      pets: pets,
    })
  }

  // get all user pets
  static async getAllUserPets(req, res) {
    // get user from token
    const token = getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt")

    res.status(200).json({
      pets,
    })
  }

  // get all user adoptions
  static async getAllUserAdoptions(req, res) {
    // get user from token
    const token = getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.find({ "adopter._id": user._id }).sort("-createdAt")

    res.status(200).json({
      pets,
    })
  }
  // get a specific pet
  static async getPetById(req, res) {
    const id = req.params.id

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" })
      return
    }

    // check if pet exists
    const pet = await Pet.findOne({ _id: id })

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" })
      return
    }

    res.status(200).json({
      pet: pet,
    })
  }

  // remove a pet
  static async removePetById(req, res) {
    const id = req.params.id

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" })
      return
    }

    // check if pet exists
    const pet = await Pet.findOne({ _id: id })

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" })
      return
    }

    // check if logged in user registered this pet
    const token = getToken(req)
    const user = await getUserByToken(token)

    //verificar se o ID é diferente (tipo e dado) do user registrado par ao Pet
    if (pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar sua solicitação, tente novamente mais tarde!",
      })
      return
    }

    await Pet.findByIdAndRemove(id)

    res.status(200).json({ message: "Pet removido com sucesso!" })
  }

  // update a pet
  static async updatePet(req, res) {
    const id = req.params.id

    const { name, age, weight, color, available } = req.body
    const images = req.files

    const updateData = {}

    // check if pet exists
    const pet = await Pet.findOne({ _id: id })

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" })
      return
    }

    // check if logged in user registered this pet
    const token = getToken(req)
    const user = await getUserByToken(token)

    //verificar se o ID é diferente (tipo e dado) do user registrado par ao Pet
    if (pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar sua solicitação, tente novamente mais tarde!",
      })
      return
    }

    //validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" })
      return
    } else {
      updateData.name = name
    }
    if (!age) {
      res.status(422).json({ message: "A idade é obrigatória!" })
      return
    } else {
      updateData.age = age
    }
    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório!" })
      return
    } else {
      updateData.weight = weight
    }

    if (!color) {
      res.status(422).json({ message: "A cor é obrigatória!" })
      return
    } else {
      updateData.color = color
    }

    //validação para que venha algum elemento no array
    if (images.length === 0) {
      res.status(422).json({ message: "A imagem é obrigatória!" })
      return
    } else {
      updateData.images = []
      images.map((image) => {
        updateData.images.push(image.filename)
      })
    }

    await Pet.findByIdAndUpdate(id, updateData)

    res.status(200).json({ message: "Pet atualizado com sucesso!" })
  }
}

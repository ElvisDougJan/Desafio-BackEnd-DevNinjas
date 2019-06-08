const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../models/userModel').CreateUserModel()

class AutenticacaoController {
  createUserForLogin(req, res) {

    const salt = bcrypt.genSaltSync(10)
    req.body.password = bcrypt.hashSync(req.body.password, salt)

    UserModel.create(req.body)
      .then(userCreated => res.json(userCreated))
      .catch(err => new Error(err))
  }

  generateNewToken(req, res) {
    UserModel.findOne({ email: req.body.email })
      .then(foundUser => {
        const { nome, email } = foundUser
        const token = jwt.sign({ nome, email }, 'api-dev-ninjas')
        res.status(200).json(token)
      })
      .catch(err => {
        res.status(400).json('Usuário não encontrado!')
        new Error(err)
      })
  }

  getAllUsers(req, res) {
    UserModel.find()
      .then(usersList => res.status(200).json(usersList))
      .catch(err => res.status(400).json('Erro ao consultar usuários') && new Error(err))
  }

  getOneUserPerID(req, res) {
    UserModel.findById(req.params.id)
      .then(foundUser => {
        foundUser
          ? res.status(200).json(foundUser)
          : res.status(404).json('Usuário não encotrado!')
      })
      .catch(err => res.status(404).json('Usuário não encotrado!') && new Error(err))
  }
}

module.exports = AutenticacaoController

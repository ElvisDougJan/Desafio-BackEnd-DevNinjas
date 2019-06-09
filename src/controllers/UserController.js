const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../models/userModel').CreateUserModel()
const db = require('./../config/db')

class AutenticacaoController {
  createUserForLogin(req, res) {

    const salt = bcrypt.genSaltSync(10)
    req.body.password = bcrypt.hashSync(req.body.password, salt)

    // UserModel.create(req.body)
    //   .then(userCreated => res.json(userCreated))
    //   .catch(err => new Error(err))

    db('users').insert(req.body)
      .then(() => res.status(200).json('User created'))
      .catch(err => res.status(400).json(err))
  }

  generateNewToken(req, res) {
    // UserModel.findOne({ email: req.body.email })
    //   .then(foundUser => {
    //     const { nome, email } = foundUser
    //     const token = jwt.sign({ nome, email }, 'api-dev-ninjas')
    //     res.status(200).json(token)
    //   })
    //   .catch(err => {
    //     res.status(400).json('Usuário não encontrado!')
    //     new Error(err)
    //   })

    db('users')
      .where({
        email: req.body.email
      })
      .then(foundUser => {
        if (foundUser.length > 0) {
          const { name, email, id } = foundUser[0]
          const token = jwt.sign({ name, email, id }, 'api-dev-ninjas')
          res.status(200).json({
            success: true,
            token
          })
        } else {
          res.status(404).json({
            success: false,
            token: null
          })
        }
      })
      .catch(err => new Error(err))
  }

  getAllUsers(req, res) {
    // UserModel.find()
    //   .then(usersList => res.status(200).json(usersList))
    //   .catch(err => res.status(400).json('Erro ao consultar usuários') && new Error(err))

    db.from('users').select('').then(users => res.json(users))
  }

  getOneUserPerID(req, res) {
    // UserModel.findById(req.params.id)
    //   .then(foundUser => {
    //     foundUser
    //       ? res.status(200).json(foundUser)
    //       : res.status(404).json('Usuário não encotrado!')
    //   })
    //   .catch(err => res.status(404).json('Usuário não encotrado!') && new Error(err))

    db('users')
      .where({
        id: req.params.id
      })
      .then(foundUser =>
        foundUser.length > 0
          ? res.status(200).json(foundUser)
          : res.status(404).json('User not found!')
      )
      .catch(err => res.json(err))
  }
}

module.exports = AutenticacaoController

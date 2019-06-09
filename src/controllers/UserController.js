const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const table = require('./../config/db')

class UserController {
  createUserForLogin(req, res) {

    const salt = bcrypt.genSaltSync(10)
    req.body.password = bcrypt.hashSync(req.body.password, salt)

    table('users')
      .insert(req.body)
      .then(() =>
        res.status(200).json({
          success: true,
          message: 'User created!'
        })
      )
      .catch(error =>
        res.status(400).json({
          success: false,
          message: 'Error creating user.',
          error
        })
      )
  }

  generateNewToken(req, res) {
    table('users')
      .where({
        email: req.body.email
      })
      .then(found_user => {
        if (found_user.length > 0) {
          const { name, email, id } = found_user[0]
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
    table('users')
      .then(users_list => res.status(200).json(users_list))
      .catch(err => res.status(400).json(err))
  }

  getOneUserPerID(req, res) {
    table('users')
      .where({
        id: req.params.id
      })
      .then(found_user =>
        found_user.length > 0
          ? res.status(200).json(found_user[0])
          : res.status(404).json({
            success: false,
            message: 'User not found!'
          })
      )
      .catch(err => res.json(err))
  }
}

module.exports = UserController

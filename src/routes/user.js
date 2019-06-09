const UserController = require('../controllers/UserController')
const userController = new UserController()
const { verifyToken } = require('../utils/verifyToken')

module.exports = app => {
  app.post('/v1/users', (req, res) => {
    userController.createUserForLogin(req, res)
  })

  app.get('/v1/users', (req, res) => {
    userController.getAllUsers(req, res)
  })

  app.get('/v1/users/:id', verifyToken, (req, res) => {
    userController.getOneUserPerID(req, res)
  })
} 
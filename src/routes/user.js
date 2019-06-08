const UserController = require('../controllers/UserController')
const userController = new UserController()
const { verifyToken } = require('../utils/verifyToken')

module.exports = app => {
  app.post('/user', (req, res) => {
    userController.createUserForLogin(req, res)
  })

  app.get('/user', (req, res) => {
    userController.getAllUsers(req, res)
  })

  app.get('/user/:id', verifyToken, (req, res) => {
    userController.getOneUserPerID(req, res)
  })
} 
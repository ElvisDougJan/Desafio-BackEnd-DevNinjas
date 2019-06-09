const UserController = require('../controllers/UserController')
const userController = new UserController()

module.exports = app => {
  app.post('/token', (req, res) => {
    userController.generateNewToken(req, res)
  })
}
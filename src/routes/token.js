const UserController = require('../controllers/UserController')
const userController = new UserController()

module.exports = app => {
  app.post('/v1/token', (req, res) =>
    userController.generateNewToken(req, res)
  )
}

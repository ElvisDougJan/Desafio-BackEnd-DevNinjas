const AutenticacaoController = require('../controllers/UsuarioController')
const autenticacaoController = new AutenticacaoController()

module.exports = app => {
  app.post('/token', (req, res) => {
    autenticacaoController.gerarToken(req, res)
  })
}
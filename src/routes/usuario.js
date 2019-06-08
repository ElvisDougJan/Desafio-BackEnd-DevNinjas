const AutenticacaoController = require('../controllers/UsuarioController')
const autenticacaoController = new AutenticacaoController()
const { verificaToken } = require('./../utils/verificaToken')

module.exports = app => {
  app.post('/usuario', (req, res) => {
    autenticacaoController.cadastraUsuarioLogin(req, res)
  })

  app.get('/usuario', (req, res) => {
    autenticacaoController.consultaUsuarios(req, res)
  })

  app.get('/usuario/:id', verificaToken, (req, res) => {
    autenticacaoController.consultaUsuarioPorId(req, res)
  })
} 
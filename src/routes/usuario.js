const AutenticacaoController = require('../controllers/UsuarioController')
const autenticacaoController = new AutenticacaoController()
const { verificaToken } = require('./../utils/verificaToken')

module.exports = app => {
  app.post('/user', (req, res) => {
    autenticacaoController.cadastraUsuarioLogin(req, res)
  })

  app.get('/user', (req, res) => {
    autenticacaoController.consultaUsuarios(req, res)
  })

  app.get('/user/:id', verificaToken, (req, res) => {
    autenticacaoController.consultaUsuarioPorId(req, res)
  })
} 
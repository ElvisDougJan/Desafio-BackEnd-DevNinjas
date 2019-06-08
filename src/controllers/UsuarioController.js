const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UsuarioModel = require('../models/usuarioModel').CriaModelUsuario()

class AutenticacaoController {
  cadastraUsuarioLogin(req, res) {

    const salt = bcrypt.genSaltSync(10)
    req.body.senha = bcrypt.hashSync(req.body.senha, salt)

    UsuarioModel.create(req.body)
      .then(usuarioCriado => res.json(usuarioCriado))
      .catch(err => new Error(err))
  }

  gerarToken(req, res) {
    UsuarioModel.findOne({ email: req.body.email })
      .then(usuarioEncontrado => {
        const { nome, email } = usuarioEncontrado
        const token = jwt.sign({ nome, email }, 'api-dev-ninjas')
        res.status(200).json(token)
      })
      .catch(err => {
        res.status(400).json('Usuário não encontrado!')
        new Error(err)
      })
  }

  consultaUsuarios(req, res) {
    UsuarioModel.find()
      .then(listUsuarios => res.status(200).json(listUsuarios))
      .catch(err => res.status(400).json('Erro ao consultar usuários') && new Error(err))
  }

  consultaUsuarioPorId(req, res) {
    UsuarioModel.findById(req.params.id)
      .then(usuarioEncontrado => {
        usuarioEncontrado
          ? res.status(200).json(usuarioEncontrado)
          : res.status(404).json('Usuario não encotrado!')
      })
      .catch(err => res.status(404).json('Usuario não encotrado!') && new Error(err))
  }
}

module.exports = AutenticacaoController

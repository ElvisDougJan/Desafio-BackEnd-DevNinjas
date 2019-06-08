const Schema = require('mongoose').Schema
const { v4 } = require('uuid')

const UsuarioSchema = new Schema({
  _id: { type: String },
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true }
}, {
    timestamps: {
      createdAt: 'criadoEm',
      updatedAt: 'alteradoEm'
    },
    versionKey: false
  })

UsuarioSchema.pre('save', function () {
  this._id = v4()
})

function CriaModelUsuario() {
  const db = require('../config/database')()
  return db.models.cliente || db.model('usuario', UsuarioSchema)
}

module.exports = {
  UsuarioSchema,
  CriaModelUsuario
}
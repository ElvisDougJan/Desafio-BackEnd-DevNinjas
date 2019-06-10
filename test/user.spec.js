const { request, expect } = require('chai')
const app = require('./../src/app')

describe('# USUÁRIOS', () => {
  describe('Deve cadastrar um novo usuário ADMIN', () => {
    it('Deve retornar um objeto informando se deu sucesso', () => {
      request(app)
        .post('/v1/users')
        .send(JSON.stringify({
          nome: 'userAdmin',
          email: 'admin@email.com',
          senha: '123456'
        }))
        .then(res => {
          expect(res.body).to.be.an('object')
        })
    })
  })
})

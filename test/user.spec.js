const chai = require('chai')
const app = require('./../src/app')
const chaiHttp = require('chai-http')
const knex = require('./../src/config/db')

chai.use(chaiHttp)

before(() => {
  knex('users').truncate()
})

describe('# USUÁRIOS', () => {

  describe('Deletear usuário admin', () => {
    it('Deve deletar o usuário admin com base em seu email', async () => {
      await chai.request(app)
        .delete('/v1/users')
        .send({
          email: 'admin@email.com'
        })
        .end((err, res) => {
          chai.expect(res).to.have.status(200)
          // chai.expect(res).to.be.an('object')
        })
    })
  })

  describe('Cadastrar admin', () => {
    it('Deve retornar um objeto informando se deu sucesso', async () => {
      await chai.request(app)
        .post('/v1/users')
        .send({
          name: 'admin',
          password: '123456',
          email: 'admin@email.com'
        })
        .end((err, res) => {
          chai.expect(res).to.have.status(200)
          // chai.expect(res).to.be.an('object')
        })
    })
  })

  describe('Gerar token', () => {
    it('Deve retornar um objeto informando sucesso e o token', async () => {
      await chai.request(app)
        .post('/v1/token')
        .send({
          email: 'admin@email.com'
        })
        .end((err, res) => {
          chai.expect(res).to.have.status(200)
          // chai.expect(res).to.be.an('object')
          // chai.expect(res.body).to.have.key('token').be.an('string')
        })
    })
  })
})

const chai = require('chai')
const app = require('./../src/app')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('# USUÁRIOS', () => {
  describe('Deve cadastrar um novo usuário ADMIN', () => {
    it('Deve retornar um objeto informando se deu sucesso', () => {
      chai.request(app)
        .get('/v1/users')
        .end((err, res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res).to.be.an('array')
        })
    })
  })
})

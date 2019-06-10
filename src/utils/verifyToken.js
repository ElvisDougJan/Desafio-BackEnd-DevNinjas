const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']

  if (token) {
    if (token.includes('Bearer ')) {
      // Removendo Bearer da string
      token = token.slice(7, token.length)
    }
    jwt.verify(token, 'api-dev-ninjas', (err, decode) => {
      if (err) {
        return res.json('Token inválido.')
      } else {
        req.decode = decode
        next()
      }
    })
  } else {
    return res.json('Token não informado.')
  }
}

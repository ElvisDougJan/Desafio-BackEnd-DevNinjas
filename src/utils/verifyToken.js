const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']

  if (token) {
    if (token.includes('Bearer ')) {
      // Removendo Bearer da string
      token = token.slice(7, token.length)
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token invalid.'
        })
      } else {
        req.decode = decode
        next()
      }
    })
  } else {
    return res.json({
      success: false,
      message: 'Token not provided.'
    })
  }
}

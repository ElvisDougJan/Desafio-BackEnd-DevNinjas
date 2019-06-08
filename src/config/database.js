const mongoose = require('mongoose')
let db = null

module.exports = () => {
  if (!db) {
    db = mongoose.connect('mongodb://localhost:27017/dev-ninjas', { useNewUrlParser: true })
      .then(() => console.log('Conectado com a database com sucesso!'))
      .catch(err => new Error(err))
  }
  return mongoose.connection
}
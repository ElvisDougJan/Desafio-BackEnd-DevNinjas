const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

// CONFIGURAÇÃO DA API
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// CHAMADA DAS ROTAS
const rotaIndex = require('./routes/index')

rotaIndex(app)

module.exports = app

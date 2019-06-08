const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

// CONFIGURAÇÃO DA API
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// CHAMADA DAS ROTAS
const indexRoute = require('./routes/index')
const userRoute = require('./routes/user')
const tokenRoute = require('./routes/token')

indexRoute(app)
userRoute(app)
tokenRoute(app)

module.exports = app

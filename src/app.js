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
const productRoute = require('./routes/products')
const customersRoute = require('./routes/customers')
const ordersRoute = require('./routes/orders')

indexRoute(app)
userRoute(app)
tokenRoute(app)
productRoute(app)
customersRoute(app)
ordersRoute(app)

module.exports = app

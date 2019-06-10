const OrderController = require('../controllers/OrdersController')
const orderController = new OrderController()
const { verifyToken } = require('./../utils/verifyToken')

module.exports = app => {
  app.post('/v1/orders', verifyToken, (req, res) => {
    orderController.createNewOrder(req, res)
  })

  app.put('/v1/orders/:id', verifyToken, (req, res) => {
    orderController.updateStatusOrderPerID(req, res)
  })

  app.get('/v1/orders', verifyToken, (req, res) => {
    orderController.getAllOrders(req, res)
  })
}
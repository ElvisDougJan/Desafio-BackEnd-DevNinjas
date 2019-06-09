const OrderController = require('../controllers/OrdersController')
const orderController = new OrderController()

module.exports = app => {
  app.post('/v1/orders', (req, res) => {
    orderController.createNewOrder(req, res)
  })

  app.put('/v1/orders/:id', (req, res) => {
    orderController.updateStatusOrderPerID(req, res)
  })
}
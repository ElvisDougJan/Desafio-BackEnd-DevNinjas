const table = require('./../config/db')
const moment = require('moment')

class OrdersController {
  async createNewOrder(req, res) {
    const { id, created_at, status, total, buyer } = req.body

    if (total < 0) {
      res.status(400).json({
        success: false,
        message: 'Total value must be greater than 0.'
      })
    }

    const newOrder = {
      id,
      created_at: moment(created_at).format('YYYY-MM-DD HH:mm:ss'),
      status,
      total,
      customer_id: buyer.id
    }

    const everyValuesOK = req.body.items.every(item =>
      item.price_unit < 0 || item.total < 0 || item.amount < 0 ? false : true)

    if (!everyValuesOK) {
      res.json({
        success: false,
        message: 'Every values must be greater than 0.'
      })
    } else {
      const listItems = req.body.items.map(item => ({
        amount: item.amount,
        price_unit: item.price_unit,
        total: item.total,
        product_id: item.product.id,
        order_id: req.body.id
      }))

      return table('orders')
        .insert(newOrder)
        .then(async () => {
          return table('items')
            .insert(listItems)
            .then(() => res.status(200).json({
              success: true,
              message: 'Order created successfully!'
            }))
            .catch(err => new Error(err))
        })
        .catch(err => res.status(400).json(err))
    }
  }
}

module.exports = OrdersController

const table = require('./../config/db')
const moment = require('moment')

class OrdersController {
  async createNewOrder(req, res) {
    const { id, created_at, status, total, buyer } = req.body

    const newOrder = {
      id,
      created_at: moment(created_at).format('YYYY-MM-DD HH:mm:ss'),
      status,
      total,
      customer_id: buyer.id
    }

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
          .catch(err => console.log(err))
      })
      .catch(err => res.status(400).json(err))
  }
}

module.exports = OrdersController

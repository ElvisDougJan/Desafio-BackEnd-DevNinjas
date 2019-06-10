const knex = require('./../config/db')
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

      return knex('orders')
        .insert(newOrder)
        .then(async () => {
          return knex('items')
            .insert(listItems)
            .then(() =>
              res.status(200).json({
                success: true,
                message: 'Order created successfully!'
              }))
            .catch(err => new Error(err))
        })
        .catch(err => res.status(400).json(err))
    }
  }

  updateStatusOrderPerID(req, res) {
    knex('orders')
      .where({
        id: req.params.id
      })
      .update({
        status: req.body.status
      })
      .then(order_updated =>
        order_updated === 1
          ? res.status(200).json({
            success: true,
            message: `Order ID ${req.params.id} updated successfully!`
          })
          : res.status(400).json({
            success: false,
            message: `Error on update order ID ${req.params.id}! Make sure the ID is correct.`
          })
      )
      .catch(err => new Error(err))
  }

  async getAllOrders(req, res) {
    let order_formated = []

    await knex('orders')
      .leftJoin('customers', function () {
        this.on('orders.id', '=', 'customers.id')
      })
      .then(async order_founded => {
        for (let i in order_founded) {
          await knex('items')
            .where({
              order_id: order_founded[i].id
            })
            .then(items_found => {
              const list_items = items_found.map(items => ({ ...items }))
              order_formated.push({
                id: order_founded[i].id,
                created_at: order_founded[i].created_at,
                status: order_founded[i].status,
                total: order_founded[i].total,
                buyer: {
                  id: order_founded[i].customer_id,
                  name: order_founded[i].name,
                  cpf: order_founded[i].cpf,
                  email: order_founded[i].email
                },
                items: list_items
              })
            })
        }
        res.status(200).json(order_formated)
      })
      .catch(err => res.status(400).json(err))
  }
}

module.exports = OrdersController

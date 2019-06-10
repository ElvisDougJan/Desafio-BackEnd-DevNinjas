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
    let items_formated = []
    let buyer = {}

    await knex('orders')
      .leftJoin('customers', function () {
        this.on('orders.id', '=', 'customers.id')
      })
      .then(async order_founded => {
        order_founded.forEach(order => {
          knex('items')
            .where({
              order_id: order.id
            })
            .then(items_found => {
              const list_items = items_found.map(items => ({ ...items }))
              console.log({
                id: order.id,
                created_at: order.created_at,
                status: order.status,
                total: order.total,
                buyer: {
                  id: order.customer_id,
                  name: order.name,
                  cpf: order.cpf,
                  email: order.email
                },
                items: list_items
              })
            })
          })
          // console.log(order_formated)
        // order_founded.forEach(order => {
        //   knex('items')
        //     .leftJoin('products', function () {
        //       this.on('items.product_id', '=', 'products.id')
        //     })
        //     .where({
        //       order_id: 0
        //     })
        //     .then(items_found => {
        //       console.log(items_found)
        //     })
        //     .catch(err => console.log(err))
        // })

        // order_founded.forEach(order => {
        //   knex('customers')
        //     .where({ id: order.customer_id })
        //     .then(costumer_found => {
        //       knex('items')
        //         .where({
        //           order_id: order.id
        //         })
        //         .then(items_found => {
        //           order_formated.push({
        //             id: order.id,
        //             created_at: order.created_at,
        //             status: order.status,
        //             total: order.total,
        //             buyer: {
        //               id: costumer_found.customer_id,
        //               name: costumer_found.name,
        //               cpf: costumer_found.cpf,
        //               email: costumer_found.email
        //             },
        //             items: []
        //           })
        //         })
        //     })
        // })

        // order_formated = order_founded.map(order => ({
        //   id: order.id,
        //   created_at: order.created_at,
        //   status: order.status,
        //   total: order.total,
        //   buyer: {
        //     id: order.customer_id,
        //     name: order.name,
        //     cpf: order.cpf,
        //     email: order.email
        //   },
        //   items: []
        // }))

        // knex('items')
        //   .leftJoin('products', function () {
        //     this.on('items.product_id', '=', 'products.id')
        //   })
        //   .where({
        //     order_id: order_founded[0].id
        //   })
        //   .then(r => console.log(r))
        //   .catch(err => console.log(err))
      })
    // await knex
    //   .select('*')
    //   .from('items')
    //   .leftJoin('products', function () {
    //     this.on('items.product_id', '=', 'products.id')
    //   })
    //   .then(items_founded => {
    //     items_formated = items_founded.map(item => ({
    //       product: {
    //         id: item.product_id,
    //         sku: item.sku,
    //         title: item.name,
    //       },
    //       amount: item.amount,
    //       price_unit: item.price_unit,
    //       total: item.total
    //     }))
    //   })
    //   .catch(err => res.status(400).json(err))

    // let order_final = order_formated.map(order => ({
    //   id: order.id,
    //   created_at: order.created_at,
    //   status: order.status,
    //   total: order.total,
    //   buyer,
    //   items: items_formated
    // }))

    // res.json(order_formated)
  }
}

module.exports = OrdersController

const table = require('./../config/db')
const moment = require('moment')

class ProductController {
  createNewProduct(req, res) {
    let created_at = ''
    let updated_at = ''

    if (req.body.price < 0) {
      res.json('O preço precisa ser maior que zero!')
    } else {
      if (req.body.created_at || req.body.updated_at) {
        created_at = moment(req.body.created_at).format('YYYY-MM-DD HH:mm:ss')
        updated_at = moment(req.body.updated_at).format('YYYY-MM-DD HH:mm:ss')
      } else {
        created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
      }

      table('products')
        .insert({
          ...req.body,
          created_at,
          updated_at
        })
        .then(() => res.json({
          success: true,
          message: 'Product created successfully!'
        }))
        .catch(err => res.json(err))
    }
  }

  getAllProducts(req, res) {
    table('products')
      .then(list_products => res.json(list_products))
      .catch(err => res.status(400).json(err))
  }

  getOneProductPerID(req, res) {
    table('products')
      .where({
        id: req.params.id
      })
      .then(product =>
        product.length > 0
          ? res.status(200).json(product[0])
          : res.status(404).json({
            success: false,
            message: 'Product not found!'
          })
      )
      .catch(err => res.status(500).json(err))
  }

  deleteOneProductPerID(req, res) {
    table('products')
      .where({
        id: req.params.id
      })
      .del()
      .then(deleted_product =>
        deleted_product === 1
          ? res.status(200).json({
            success: true,
            message: 'Product deleted successfully!'
          })
          : res.status(404).json({
            success: false,
            message: `ID ${req.params.id} producer does not exist in database.`
          })
      )
  }
}

module.exports = ProductController

// const ProductModel = require('./../models/productModel').createProductModel()
const table = require('./../config/db')
const moment = require('moment')

class ProductController {
  createNewProduct(req, res) {
    req.body.created_at = moment(req.body.created_at).format('YYYY-MM-DD HH:mm:ss')
    req.body.updated_at = moment(req.body.updated_at).format('YYYY-MM-DD HH:mm:ss')

    table('products').insert(req.body)
      .then(product_created => res.json(product_created))
      .catch(err => res.json(err))
  }

  getAllProducts(req, res) {
    table('products')
      .then(list_products => res.json(list_products))
      .catch(err => res.status(400).json(err))
  }
}

module.exports = ProductController

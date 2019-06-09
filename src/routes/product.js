const ProductController = require('../controllers/ProductController')
const productController = new ProductController()
const { verifyToken } = require('../utils/verifyToken')

module.exports = app => {
  app.post('/v1/products', verifyToken, (req, res) => {
    productController.createNewProduct(req, res)
  })

  app.get('/v1/products', (req, res) => {
    productController.getAllProducts(req, res)
  })

  // app.get('/user/:id', verifyToken, (req, res) => {
  //   productController.getOneUserPerID(req, res)
  // })
} 
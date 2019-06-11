const ProductController = require('../controllers/ProductController')
const productController = new ProductController()
const { verifyToken } = require('../utils/verifyToken')

module.exports = app => {
  app.post('/v1/products', verifyToken, (req, res) =>
    productController.createNewProduct(req, res)
  )

  app.get('/v1/products', verifyToken, (req, res) =>
    productController.getAllProducts(req, res)
  )

  app.get('/v1/products/:id', verifyToken, (req, res) =>
    productController.getOneProductPerID(req, res)
  )

  app.delete('/v1/products/:id', verifyToken, (req, res) =>
    productController.deleteOneProductPerID(req, res)
  )
}

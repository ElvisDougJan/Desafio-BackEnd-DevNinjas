const CustomersController = require('../controllers/CustomersController')
const customerController = new CustomersController()
const { verifyToken } = require('./../utils/verifyToken')

module.exports = app => {
  app.post('/v1/customers', verifyToken, (req, res) => {
    customerController.createNewCustomer(req, res)
  })

  app.get('/v1/customers/', verifyToken, (req, res) => {
    customerController.getAllCustomers(req, res)
  })

  app.get('/v1/customers/:id', verifyToken, (req, res) => {
    customerController.getOneCustomerPerID(req, res)
  })

  app.delete('/v1/customers/:id', verifyToken, (req, res) => {
    customerController.deleteOneCustomerPerID(req, res)
  })
}
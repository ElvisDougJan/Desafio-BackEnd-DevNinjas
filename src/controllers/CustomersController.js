const table = require('./../config/db')
const moment = require('moment')
const validateCPF = require('validar-cpf')

class CustomerController {
  createNewCustomer(req, res) {
    if (!validateCPF(req.body.cpf)) {
      res.status(400).json({
        success: false,
        message: 'This CPF is not valid!'
      })
    } else {
      req.body.created_at = moment(req.body.created_at).format('YYYY-MM-DD HH:mm:ss')
      req.body.updated_at = moment(req.body.updated_at).format('YYYY-MM-DD HH:mm:ss')

      table('customers')
        .insert(req.body)
        .then(() =>
          res.status(200).json({
            success: true,
            message: 'Customer created successfully!'
          })
        )
        .catch(err => res.status(400).json(err))
    }
  }

  getAllCustomers(req, res) {
    table('customers')
      .then(list_customers => res.status(200).json(list_customers))
      .catch(err => res.status(404).json(err))
  }

  getOneCustomerPerID(req, res) {
    table('customers')
      .where({
        id: req.params.id
      })
      .then(customer_found =>
        customer_found.length > 0
          ? res.status(200).json(customer_found[0])
          : res.status(404).json({
            success: false,
            message: 'Customer not found!'
          })
      )
  }

  deleteOneCustomerPerID(req, res) {
    table('customers')
      .where({
        id: req.params.id
      })
      .del()
      .then(customer_deleted =>
        customer_deleted === 1
          ? res.status(200).json({
            success: true,
            message: 'Customer deleted successfully!'
          })
          : res.status(400).json({
            success: false,
            message: `ID ${req.params.id} customer does not exist in database.`
          })
      )
  }
}

module.exports = CustomerController

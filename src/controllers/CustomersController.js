const knex = require('./../config/db')
const moment = require('moment')
const validateCPF = require('validar-cpf')

class CustomerController {
  createNewCustomer (req, res) {
    let created_at = ''
    let updated_at = ''

    if (!validateCPF(req.body.cpf)) {
      res.status(400).json({
        success: false,
        message: 'This CPF is not valid!'
      })
    } else {
      if (req.body.created_at || req.body.updated_at) {
        created_at = moment(req.body.created_at).format('YYYY-MM-DD HH:mm:ss')
        updated_at = moment(req.body.updated_at).format('YYYY-MM-DD HH:mm:ss')
      } else {
        created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
      }

      knex('customers')
        .insert({
          ...req.body,
          created_at,
          updated_at
        })
        .then(() =>
          res.status(200).json({
            success: true,
            message: 'Customer created successfully!'
          })
        )
        .catch(err => res.status(400).json(err))
    }
  }

  getAllCustomers (req, res) {
    knex('customers')
      .then(listCustomers => res.status(200).json(listCustomers))
      .catch(err => res.status(404).json(err))
  }

  getOneCustomerPerID (req, res) {
    knex('customers')
      .where({
        id: req.params.id
      })
      .then(customeFound =>
        customeFound.length > 0
          ? res.status(200).json(customeFound[0])
          : res.status(404).json({
            success: false,
            message: 'Customer not found!'
          })
      )
  }

  deleteOneCustomerPerID (req, res) {
    knex('customers')
      .where({
        id: req.params.id
      })
      .del()
      .then(customerDeleted =>
        customerDeleted === 1
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

const Schema = require('mongoose').Schema
const { v4 } = require('uuid')

const ProductSchema = new Schema({
  _id: { type: String },
  sku: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  })

ProductSchema.pre('save', function () {
  this._id = v4()
})

function createProductModel() {
  const db = require('../config/database')()
  return db.models.product || db.model('product', ProductSchema)
}

module.exports = {
  ProductSchema,
  createProductModel
}
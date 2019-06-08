const Schema = require('mongoose').Schema
const { v4 } = require('uuid')

const UserSchema = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    versionKey: false
  })

UserSchema.pre('save', function () {
  this._id = v4()
})

function CreateUserModel() {
  const db = require('../config/database')()
  return db.models.user || db.model('user', UserSchema)
}

module.exports = {
  UserSchema,
  CreateUserModel
}
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {type: String},
    parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'},
})

schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justOnt: false,
  res: 'Category'
})

schema.virtual('children', {
  localField: '_id',
  foreignField: 'categories',
  justOnt: false,
  res: 'Article'
})

module.exports = mongoose.model('Category', schema)
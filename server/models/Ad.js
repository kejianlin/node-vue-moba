const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {type: String},
    categories: [{
        image: {type: String},
        url: {type: String},
    }],
    body: {type:String},
})

module.exports = mongoose.model('Ad', schema)
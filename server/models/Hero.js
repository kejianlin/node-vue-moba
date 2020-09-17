const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {type: String},
    avatar: {type: String},
    title: {type: String},
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
    scores: {
        difficult: {type: Number},
        skills: {type: Number},
        attack: {type: Number},
        survive: {type: Number},
    },
    // parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'},
    skills: [{
        icon: {type: String},
        name: {type: String},
        description: {type: String},
        tips: {type: String}
    }],
    
})

module.exports = mongoose.model('Hero', schema)
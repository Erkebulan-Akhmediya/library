const { Schema, model } = require('mongoose')

const schema = new Schema({
    title: String, 
    author: String, 
    published: Number, 
})

module.exports = model('Book', schema)
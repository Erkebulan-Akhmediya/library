const mongoose = require('mongoose')
const Book = require('./model/Book')

const express = require('express')
const app = express()

// const methodOverride = require('')

app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('hi, Dilnaz')
})

/*   /add   */

app.get('/add', (req, res) => {
    res.render('add')
})

app.post('/add', (req, res) => {
    Book.create({
        title: req.body.title, 
        author: req.body.author, 
        published: req.body.published,
    })
    res.redirect('/add')
})

/*   /books   */

app.get('/books', async (req, res) => {
    const result = await Book.find({}, { _id: 0, title: 1 })
    res.render('books', { array: result })
})

app.get('/books/:id', async (req, res) => {
    const result = await Book.find({}, { _id: 0, title: 1, author: 1, published: 1 })
    res.render('book', { book: result[req.params.id], id: req.params.id })
})

/*   /update   */

app.get('/books/:id/update', async (req, res) => {
    const result = await Book.find()
    res.render('update', { book: result[req.params.id], id: req.params.id })
})

app.post('/books/:id/update', async (req, res) => {
    const result = await Book.find()
    const id = result[req.params.id]._id

    await Book.findByIdAndUpdate(id, {
        title: req.body.title, 
        author: req.body.author, 
        published: req.body.published, 
    })
    res.redirect('/books/' + req.params.id)
})

/*   /delete   */

app.post('/books/:id/delete', async (req, res) => {
    const result = await Book.find()
    await Book.findOneAndDelete({ title: result[req.params.id].title })
    res.redirect('/books')
})

async function start() {
    try {
        await mongoose.connect('mongodb+srv://yerkebulan:yerke@cluster0.w75frce.mongodb.net/?retryWrites=true&w=majority')
        app.listen(8888)
    } catch {
        console.log('failed to connect to db')
    }
}

start()
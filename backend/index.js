
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const mongoose = require('mongoose')

const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const server = http.createServer(app)

// const blogSchema = new mongoose.Schema({
//     title: String,
//     author: String,
//     url: String,
//     likes: Number
// })

// const Blog = mongoose.model('Blog', blogSchema)

// const mongoUrl = 'mongodb+srv://fullstack:PW@cluster0.5qyj6.mongodb.net/bloglist?retryWrites=true&w=majority'
// mongoose.connect(mongoUrl)

// app.use(cors())
// app.use(express.json())


// app.get('/api/blogs', (request, response) => {
//     Blog
//         .find({})
//         .then(blogs => {
//             response.json(blogs)
//         })
// })

// app.post('/api/blogs', (request, response) => {

//     const body = request.body

//     const blog = new Blog({
//         title: body.title
//     })

//     if (!body.title) {
//         return response.status(400).json({
//             error: "content missing"
//         })
//     }

//     blog
//         .save()
//         .then(result => {
//             response.status(201).json(result)
//         })
// })

// const PORT = 3003
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
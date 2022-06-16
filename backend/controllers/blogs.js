const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name:1})
  res.json(blogs)
})


blogsRouter.get('/:id', async (req, response) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})


const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes
  })

  if (!body.title) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(savedBlog)

})

blogsRouter.delete('/:id', async (req, res) => {
  
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})


// blogsRouter.put('/:id', async(req, response) => {
//   const body = req.body

//   const blog = new Blog({
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.number
//   })

//   await Blog.findByIdAndUpdate(req.params.id, blog, {
//       new: true
//     })
//     .then(updatedBLog => {
//       response.json(updatedBLog)
//     })
//    })
blogsRouter.put("/:id", (req, res, next) => {
  const blog = new Blog({
    _id: req.body.id,
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  });

  Blog.updateOne({
    id: req.params.id
  }, req.body).then(result => {
    res.status(200).json({
      message: "Update successful!"
    });
  });
});


module.exports = blogsRouter
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./tests_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})


test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const contents = blogsAtEnd.map(n => n.title);
    expect(contents).toContain(
        'async/await simplifies making async calls'
    )
})


    test('deleted blog: succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
  
      const blogsAtEnd = await helper.blogsInDb()
  
      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )
  
      const contents = blogsAtEnd.map(r => r.title)
  
      expect(contents).not.toContain(blogToDelete.title)
    })
  
    test('succeeds with status code 200 if blog used put method', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        const newBlog = {
            title: 'test put',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7
        }
        await api
          .put(`/api/blogs/${blogToDelete.id}`)
          .send(newBlog)
          .expect(200)
    
        const blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(
          helper.initialBlogs.length -0
        )
    
        const contents = blogsAtEnd.map(r => r.title)
    
        expect(contents).toContain(
            'test put'
        )
      })
    


afterAll(() => {
    mongoose.connection.close()
})
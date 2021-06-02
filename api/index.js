const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1800s' })
}

app.get('/login', async (req, res) => {
  // const SECRET = process.env.TOKEN_SECRET

  const user = {
    email: 'droyer01@gmail.com'
  }

  const token = await generateAccessToken(user)

  res.json(token)
})

app.get('/posts', (req, res) => {
  // res.send('It worked. Send some posts now!')
  res.json([
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' }
  ])
})

export default {
  path: '/api',
  handler: app
}

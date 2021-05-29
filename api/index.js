const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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

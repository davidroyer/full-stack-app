/* eslint-disable camelcase */

import axios from 'axios'

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1800s' })
}

const redirect_uri = 'http://localhost:3000/pocket-callback'
const consumer_key = '92797-bd626bd523c3a7ab5ad3822b'

const pocketApi = axios.create({
  baseURL: 'https://getpocket.com/v3',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Accept': 'application/json'
  }
})

app.get('/pocket', async (req, res) => {
  const { data } = await pocketApi.post('/oauth/request', {
    consumer_key,
    redirect_uri
  })
  console.log('🚀 ~ file: index.js ~ line 26 ~ app.get ~ data', data)

  res.json(data)
})

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

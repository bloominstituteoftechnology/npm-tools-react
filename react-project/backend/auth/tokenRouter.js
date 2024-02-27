const express = require('express')
const Auth = require('./tokenService')

const router = express.Router()

router.post('/register', async (req, res) => {
  const [status, body] = await Auth.register(req.body)
  res.status(status).json(body)
})

router.post('/login', async (req, res) => {
  const [status, body] = await Auth.login(req.body)
  res.status(status).json(body)
})

router.get('/verify', async (req, res) => {
  const [status, body] = await Auth.verify(req.headers.authorization)
  res.status(status).json(body)
})

module.exports = router

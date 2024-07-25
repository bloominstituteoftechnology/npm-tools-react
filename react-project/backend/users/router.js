const express = require('express')
const User = require('./service')

const router = express.Router()

router.get('/', (req, res) => {
  res.json(User.getAll())
})

router.get('/:id', (req, res) => {
  res.json(User.getById(req.params.id))
})

router.post('/', (req, res) => {
  res.json(User.create(req.body))
})

router.delete('/:id', (req, res) => {
  res.json(User.remove(req.params.id))
})

module.exports = router

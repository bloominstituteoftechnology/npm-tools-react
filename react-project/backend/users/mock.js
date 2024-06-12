const User = require('./service')
const { setupServer } = require('msw/node')
const { http, HttpResponse } = require('msw')

function getAll() {
  return HttpResponse.json(User.getAll())
}

function getById({ params }) {
  return HttpResponse.json(User.getById(params.id))
}

async function create({ request }) {
  const user = User.create(await request.json())
  return HttpResponse.json(user)
}

function remove({ params }) {
  return HttpResponse.json(User.remove(params.id))
}

const handlers = [
  http.get("*/api/users", getAll),
  http.post("*/api/users", create),
  http.get("*/api/users/:id", getById),
  http.delete("*/api/users/:id", remove),
]

module.exports = setupServer(...handlers)

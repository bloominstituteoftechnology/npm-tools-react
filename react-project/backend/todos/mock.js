const Todo = require('./service')
const { setupServer } = require('msw/node')
const { http, HttpResponse } = require('msw')

function getAll() {
  return HttpResponse.json(Todo.getAll())
}

function getById({ params }) {
  return HttpResponse.json(Todo.getById(params.id))
}

async function create({ request }) {
  const todo = Todo.create(await request.json())
  return HttpResponse.json(todo)
}

function toggleDone({ params }) {
  return HttpResponse.json(Todo.toggleDone(params.id))
}

function remove({ params }) {
  return HttpResponse.json(Todo.remove(params.id))
}

const handlers = [
  http.get("*/api/todos", getAll),
  http.post("*/api/todos", create),
  http.get("*/api/todos/:id", getById),
  http.patch("*/api/todos/:id", toggleDone),
  http.delete("*/api/todos/:id", remove),
]

module.exports = setupServer(...handlers)

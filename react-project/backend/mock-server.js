const Todo = require('./helpers')
const { setupServer } = require('msw/node')
const { http, HttpResponse } = require('msw')

function getAll() {
  return HttpResponse.json(Todo.getAll())
}
// function getById({ params }) {
//   return HttpResponse.json(Todo.getById(params.id))
// }
// async function create({ request }) {
//   const todo = Todo.create(await request.json())
//   return HttpResponse.json(todo)
// }
// function toggleDone({ params }) {
//   return HttpResponse.json(Todo.toggleDone(params.id))
// }
// function remove({ params }) {
//   return HttpResponse.json(Todo.remove(params.id))
// }

const handlers = [
  http.get('http://localhost:9009/api/todos', () => { console.log('did it') }),
  // http.get('http://localhost:9009/api/todos', getAll),
  // http.get('http://localhost:9009/api/todos/:id', getById),
  // http.post('http://localhost:9009/api/todos', create),
  // http.patch('http://localhost:9009/api/todos/:id', toggleDone),
  // http.delete('http://localhost:9009/api/todos/:id', remove),
]

module.exports = setupServer(...handlers)

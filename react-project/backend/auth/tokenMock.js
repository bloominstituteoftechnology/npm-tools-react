const Auth = require('./tokenService')
const { setupServer } = require('msw/node')
const { http, HttpResponse, delay } = require('msw')

async function register({ request }) {
  await delay(10)
  const [status, data] = await Auth.register(await request.json())
  const response = new HttpResponse(JSON.stringify(data), {
    status, headers: { 'Content-Type': 'application/json' },
  })
  return response
}

async function login({ request }) {
  await delay(10)
  const [status, data] = await Auth.login(await request.json())
  const response = new HttpResponse(JSON.stringify(data), {
    status, headers: { 'Content-Type': 'application/json' },
  })
  return response
}

const handlers = [
  http.post('*/api/auth/token/register', register),
  http.post('*/api/auth/token/login', login),
]

module.exports = setupServer(...handlers)

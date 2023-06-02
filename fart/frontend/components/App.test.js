import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import server from '../../backend/mock-server'
import { resetTodos } from '../../backend/helpers'
import App from './App'

jest.setTimeout(750)
const waitForOptions = { timeout: 100 }
const queryOptions = { exact: false }

const renderApp = ui => {
  window.localStorage.clear()
  window.history.pushState({}, 'Test page', '/')
  return render(ui)
}

beforeAll(() => { server.listen() })
afterAll(() => { server.close() })
beforeEach(() => {
  resetTodos()
  renderApp(<App />)
})
afterEach(() => {
  server.resetHandlers()
})

test('todos are present', async () => {
  expect(await screen.findByText(/laundry/, queryOptions, waitForOptions)).toBeInTheDocument()
  expect(await screen.findByText(/dishes/, queryOptions, waitForOptions)).toBeInTheDocument()
  expect(await screen.findByText(/groceries/, queryOptions, waitForOptions)).toBeInTheDocument()
})

test('can do laundry', async () => {
  fireEvent.click(await screen.findByText(/laundry/, queryOptions, waitForOptions))
  expect(await screen.findByText('laundry DONE', queryOptions, waitForOptions)).toBeInTheDocument()
})

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const StyledTodo = styled.li`
  text-decoration: ${pr => pr.$complete ? 'line-through' : 'initial'};
  cursor: pointer;
`

export default function Todo() {
  const [todos, setTodos] = useState([])

  const getAll = () => fetch('http://localhost:9009/api/todos')
    .then(res => res.json())
    .then(data => setTodos(data))

  const toggle = id => axios.patch(`http://localhost:9009/api/todos/${id}`)
    .then(res => setTodos(res.data))

  useEffect(() => { getAll() }, [])

  return (
    <div>
      <h2>Todo Component</h2>
      <ul>
        {
          todos.map(todo => (
            <StyledTodo onClick={() => toggle(todo.id)} $complete={todo.complete} key={todo.id}>
              <span>{todo.name}{todo.complete && ' ✔️'}</span>
            </StyledTodo>
          ))
        }
      </ul>
    </div>
  )
}

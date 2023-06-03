import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import squeak from '../audio/squeak.mp3'
import duck from '../images/duck.jpg'

const StyledTodo = styled.li`
  text-decoration: ${pr => pr.complete ? 'line-through' : 'initial'};
  cursor: pointer;
`

export default function App() {
  const [todos, setTodos] = useState([])

  const getAll = () => fetch('http://localhost:9000/api/todos')
    .then(res => res.json())
    .then(data => setTodos(data))

  const toggle = id => axios.patch(`http://localhost:9000/api/todos/${id}`)
    .then(res => setTodos(res.data))

  useEffect(() => { getAll() }, [])

  const audioRef = useRef(null)

  const playSound = () => {
    audioRef.current.play()
  }

  return (
    <div>
      <ul>
        {
          todos.map(todo => (
            <StyledTodo onClick={() => toggle(todo.id)} complete={todo.complete} key={todo.id}>
              <span>{todo.name}{todo.complete && ' DONE'}</span>
            </StyledTodo>
          ))
        }
      </ul>
      <img style={{ cursor: 'pointer' }} src={duck} onClick={playSound} />
      <audio ref={audioRef}>
        <source src={squeak} type="audio/mpeg" />
      </audio>
    </div>
  )
}

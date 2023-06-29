import { useState, useEffect } from 'react'
import List from '@mui/material/List'
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'
import { Box, Typography } from '@mui/material'

const getIntialData = () => {
    const data = JSON.parse(localStorage.getItem('todos'))
    if (!data) return []
    return data
}

export default function TodoList() {
    const [todos, setTodos] = useState(getIntialData)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos)) //'key', make todos to a string
    }, [todos]) //[list of dependencies]

    const removeTodo = (id) => {
        setTodos(prevTodos => {
            return prevTodos.filter(t => t.id !== id)
        })
    }

    const toggleTodo = (id) => {
        setTodos(prevTodos => {
            return prevTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed } //opposite value
                } else {
                    return todo
                }
            })
        })
    }

    const addTodo = (text) => {
        setTodos(prevTodos => {
            return [...prevTodos, { text: text, id: crypto.randomUUID(), completed: false }]
        })
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            m: 3
        }}>
            <Typography variant='h2' component='h1' sx={{ flexGrow: 1 }}>
                Todos
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {todos.map(todo => (
                    <TodoItem
                        todo={todo}
                        key={todo.id}
                        remove={removeTodo}
                        toggle={() => toggleTodo(todo.id)} />
                ))}
                <TodoForm addTodo={addTodo} />
            </List>
        </Box>
    )
}


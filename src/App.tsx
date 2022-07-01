import { useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'
import { PlusCircle } from 'phosphor-react'

import { Header } from './components/Header'
import { TodoList } from './components/TodoList'

import clipboard from './assets/clipboard.svg'

import './styles/global.css'
import styles from './styles/App.module.scss'

type ListProps = {
  id: string
  title: string
  isComplete: boolean
}

function App() {
  const [todo, setTodo] = useState('')
  const [todoList, setTodoList] = useState<ListProps[]>([])

  useEffect(() => {
    if (localStorage.getItem('Todos')) {
      const storedTodos = JSON.parse(localStorage.getItem('Todos') as string)
      setTodoList(storedTodos)
    }
  }, [])

  const addTodo = () => {
    if (!todo) return
    const todoId = uuidv4()

    const newTodo = { id: todoId, title: todo, isComplete: false }
    setTodoList([...todoList, newTodo])
    localStorage.setItem('Todos', JSON.stringify([...todoList, newTodo]))
    setTodo('')
  }

  const todochecked = todoList.reduce((acc, task) => {
    if (task.isComplete) {
      acc++
    }
    return acc
  }, 0)

  const handleChecked = (id: string) => {
    const checkedTodos = todoList.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            isComplete: !todo.isComplete
          }
        : todo
    )
    setTodoList(checkedTodos)
    localStorage.setItem('Todos', JSON.stringify(checkedTodos))
  }

  const handleDelete = (id: string) => {
    const filteredTasks = todoList.filter((task) => task.id !== id)

    setTodoList(filteredTasks)
    localStorage.setItem('Todos', JSON.stringify(filteredTasks))
  }

  return (
    <>
      <div>
        <Header />
        <div className={styles.input_wrapper}>
          <input
            className={styles.input_todo}
            type="text"
            placeholder="Adicione uma tarefa"
            name="todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />

          <button className={styles.add_button} type="submit" onClick={addTodo}>
            Criar{<PlusCircle size={16} />}
          </button>
        </div>
      </div>

      <main className={styles.main_wrapper}>
        <header>
          <div>
            <h4 className={styles.todo_created}>
              Tarefas Criadas <span>{todoList.length}</span>
            </h4>
          </div>
          <div>
            <h4 className={styles.todo_concluded}>
              Concluidas{' '}
              <span>
                {todoList.length} de {todochecked}
              </span>
            </h4>
          </div>
        </header>
        {todoList.length === 0 && (
          <div className={styles.clipeboard_wrapper}>
            <div className={styles.clipeboard_items}>
              <img src={clipboard} alt="" />
              <p className={styles.first_text}>
                Voce ainda nao tem tarefas cadastradas
              </p>
              <p className={styles.second_text}>
                Crie Tarefas e organize seus itens a fazer
              </p>
            </div>
          </div>
        )}

        {todoList.map((task, key) => (
          <TodoList
            key={key}
            task={task}
            handleDelete={handleDelete}
            handleChecked={handleChecked}
          />
        ))}
      </main>
    </>
  )
}

export default App

import { Trash } from 'phosphor-react'

import styles from './styles.module.scss'

type ListProps = {
  id: string
  title: string
  isComplete: boolean
}

type TodoListProps = {
  task: ListProps
  handleDelete: (id: string) => void
  handleChecked: (id: string) => void
}

export const TodoList = ({ task, handleDelete, handleChecked }:TodoListProps) => {
  
  return (
    <div>
      <div className={styles.task_box}>
        <input 
          type="checkbox" 
          id={task.id}
          readOnly
          checked={task.isComplete}
          onClick={() => handleChecked(task.id)}
        />
        <label htmlFor={task.id} className={!task.isComplete ? styles.not_checked : styles.checked}></label>
        <p className={!task.isComplete ? styles.not_marked : styles.marked}>{task.title}</p>
        <button className={styles.delete_button}
          type="button" 
          onClick={() => handleDelete(task.id)}>
          <Trash size={24} 
        />
        </button>
      </div>    
    </div>
  )
}
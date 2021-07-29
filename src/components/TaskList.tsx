import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [emptyTask, setEmptyTask] = useState(false)

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (newTaskTitle === '') return setEmptyTask(true)
    
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }

    const tarefas = [...tasks, newTask]

    setTasks(tarefas)
    setEmptyTask(false)
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const newTaskState = tasks.map((task: { id: number; isComplete: boolean; }) => {
      if(task.id === id) {
        task.isComplete = (!task.isComplete)
      }
      
      return task;

    })

    setTasks(newTaskState)

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    const tasksWithoutRemovedTask = tasks.filter((task: { id: number; }) => task.id !== id)

    setTasks(tasksWithoutRemovedTask)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
        
            <input 
              type="text" 
              placeholder="Adicionar novo todo" 
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>
             

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
      {emptyTask && <span style={{color: 'red', fontSize: '.7rem', marginRight: '.5rem'}}>Adicione um nome a sua task</span>}
    </section>
 
  )
}
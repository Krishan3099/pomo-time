import { FaTimes , FaRegSquare, FaCheckSquare} from 'react-icons/fa'
import { useState } from 'react'

const Task = ({task, onDelete, onDoubleClick}) => {

  const [taskComplete, setTaskComplete] = useState(false)

  
  return (
      <div onDoubleClick={() => onDoubleClick(task.id)} className = {task.reminder ? 'task reminder' : 'task'}>
          {taskComplete ? <FaCheckSquare className='checkbox' color='white' onClick={() => setTaskComplete(!taskComplete)}/> : <FaRegSquare className='checkbox' color='white' onClick={() => setTaskComplete(!taskComplete)}/>}
          <h3 className='task-text'>{task.text}</h3>
          {/* <FaTimes onClick={() => onDelete(task.id)} style={{color: 'red', cursor: 'pointer'}}/> */}
      </div>
  )
}

export default Task

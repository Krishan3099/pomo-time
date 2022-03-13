import Task from "./Task"
const Tasks = ({tasks, onDelete, onDoubleClick}) => {
  return (
    <div className='list-background'>
        {tasks.map((task) => (<Task onDoubleClick={onDoubleClick} onDelete = {onDelete} key = {task.id} task = {task}/>))}
    </div>
  )
}

export default Tasks
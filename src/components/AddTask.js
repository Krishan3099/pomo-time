import { useState } from "react"

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!text){
            alert('Please add a task')
            return
        }

    
        onAdd(text)
        onAdd(text)
        setText('')        
    }

  return (
    <form autocomplete="off" className = 'add-form-2' onSubmit={onSubmit}>
        <div className="form-control">
          <input required="" id='name' className ='task-input-2' type ='text' placeholder="Add another task" value={text} onChange = {(e) => setText(e.target.value)}></input>
        </div>
          
        <input type='submit' value='Save Task' className="btn btn-submit-2"></input>
      </form>
  )
}

export default AddTask
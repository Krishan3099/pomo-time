import { useState } from "react"

const SetTask = ({onSub}) => {
  const [text, setText] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!text){
      alert('Please add a task')
      return
    }

    onSub()

    // setText('')
  }

  return (
      <form autocomplete="off" className = 'add-form' onSubmit={onSubmit}>
        <div className="form-control">
          
          <input required="" id='name' className ='task-input' type ='text' placeholder="Add your task to complete..." value={text} onChange = {(e) => setText(e.target.value)}></input>
          <label for = 'name' className="form__label">Add your task to complete...</label>
        </div>
          
        <input type='submit' value='Save Task' className="btn btn-submit"></input>
      </form>
  )
}

export default SetTask
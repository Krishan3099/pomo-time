import Button from "./Button"
const TimeDisplay = () => {
  return (
    <>
      <h2 className="time">00:00:00</h2>
      <div className="time-buttons">
        <Button buttonText={'Pause'}/>
        <Button buttonText={'Reset'}/>
      </div>
    </>
  )
}

export default TimeDisplay
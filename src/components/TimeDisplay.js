import React, { useState, useRef, useEffect } from 'react'
import Button from "./Button"
const TimeDisplay = () => {
  const intervalId = useRef(null);
  const [pause, setPause] = useState(false);
  const pauseRef = useRef();
  const [timeDisplay, setTimeDisplay] = useState('00:00:00');
  const pomoCount = useRef(8);
  const onBreak = useRef(true);
  const shortBreak = useRef(1)
  const longBreak = useRef(3)
  const pomoSprint = useRef(2)
  


  const handlePomoCycles = () => {
    pomoCount.current -= 1

    //longBreak
    if (pomoCount.current <= 0){
      pomoCount.current = 8
      console.log("On Long Break")
      handleInterval(getDeadlineTime(longBreak.current))
    //pomoSprint or shortBreak
    }else {
      if(onBreak.current){
        console.log("On Short Break")
        handleInterval(getDeadlineTime(shortBreak.current))
      }else{
        console.log("On Pomo Sprint")
        handleInterval(getDeadlineTime(pomoSprint.current))
      }
    }
  }

  const switchCycles = () => {
    onBreak.current = !onBreak.current;
    handlePomoCycles();
  }

  const handleInterval = (deadline) =>{
    if (intervalId.current) clearInterval(intervalId.current);
    const id = setInterval(() => {
      pauseRef.current() ? deadline.setSeconds(deadline.getSeconds() + 1) : decrementTimer(deadline)
        console.log(pause)
    }, 1000)
    intervalId.current = id;
  }


  // --------------------------------------------------------------------------
  const getTimeRemaining = (deadline) => {
    const total = Date.parse(deadline) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 * 60 * 60) % 24);
    return {
        total, hours, minutes, seconds
    };
  }

  const decrementTimer = (deadline) => {
    let { total, hours, minutes, seconds } 
                = getTimeRemaining(deadline);
    if (total >= 0) {
        setTimeDisplay(
            (hours > 9 ? hours : '0' + hours) + ':' +
            (minutes > 9 ? minutes : '0' + minutes) + ':'
            + (seconds > 9 ? seconds : '0' + seconds)
        )
    }else {
      switchCycles()
    }
  }

  // --------------------------------------------------------------------------


  const getDeadlineTime = (minutes) => {
      let deadline = new Date();

      deadline.setMinutes(deadline.getMinutes() + minutes);
      
      return deadline;
  }



  //------------------------------------------------------------------------------
  function callback() {
    return pause;
  }

  useEffect(()=>{
    pauseRef.current = callback;
  });

  //------------------------------------------------------------------------------


  // First Entrance to Timer
  useEffect(() => {
    switchCycles()
  }, []);




  //Reset Button
  const onClickReset = () => {
    switchCycles()
  }

  

  return (
    <>
      <h2 className="time">{timeDisplay}</h2>
      <div className="time-buttons">
        <Button buttonText={pause ? 'Resume' : 'Pause'} onClick={() => setPause(!pause)}/>
        <Button onClick={onClickReset} buttonText={'Reset'}/>
      </div>
    </>
  )
}

export default TimeDisplay
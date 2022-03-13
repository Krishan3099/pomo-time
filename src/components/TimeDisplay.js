import React, { useState, useRef, useEffect } from 'react'
import Button from "./Button"

const TimeDisplay = ({appRef}) => {
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
        appRef.current.classList.remove('foward')
        appRef.current.classList.add('long-reverse')
    //pomoSprint or shortBreak
    }else {
      if(onBreak.current){
        console.log("On Short Break")
        handleInterval(getDeadlineTime(shortBreak.current))
        appRef.current.classList.remove('forward')
        appRef.current.classList.add('reverse')
      }else{
        console.log("On Pomo Sprint")
        handleInterval(getDeadlineTime(pomoSprint.current))
        appRef.current.classList.contains('reverse') && appRef.current.classList.remove('reverse')
        appRef.current.classList.contains('long-reverse') && appRef.current.classList.remove('long-reverse')
        appRef.current.classList.add('forward')
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
      if(pauseRef.current()){
        deadline.setSeconds(deadline.getSeconds() + 1)
        !appRef.current.classList.contains('paused') && appRef.current.classList.add('paused')
      }else{
        decrementTimer(deadline)
        appRef.current.classList.contains('paused') && appRef.current.classList.remove('paused')
      }
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
    let { total, hours, minutes, seconds } = getTimeRemaining(deadline);
    if (total >= 0) {
        setTimeDisplay(
            (hours > 9 ? hours : '0' + hours) + ':' +
            (minutes > 9 ? minutes : '0' + minutes) + ':' + 
            (seconds > 9 ? seconds : '0' + seconds)
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
  //Handle Pause/Resume Helpers
  function callback() {
    return pause;
  }

  useEffect(()=>{
    pauseRef.current = callback;
  });



   //Handle Reset
   const onClickReset = () => {
    switchCycles()
  }

  //------------------------------------------------------------------------------


  // First Entrance to Timer
  useEffect(() => {
    switchCycles()
    appRef.current.classList.add('forward')
  }, []);


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
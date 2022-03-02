import React, { useState, useRef, useEffect } from 'react'
import Button from "./Button"
const TimeDisplay = () => {
  const Ref = useRef(null);
  const [pause, setPause] = useState(false);
  const pauseRef = useRef();
  const [timeDisplay, setTimeDisplay] = useState('00:00:00');
  
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
    }
  }

  const setTimer = (deadline) => {
  
    setTimeDisplay('00:25:00');

    
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      pauseRef.current() ? deadline.setSeconds(deadline.getSeconds() + 1) : decrementTimer(deadline)
        console.log(pause)
        console.log(deadline)
    }, 1000)
    Ref.current = id;
  }

  const getDeadlineTime = (minutes) => {
      let deadline = new Date();

      deadline.setMinutes(deadline.getMinutes() + minutes);
      
      return deadline;
  }

  function callback() {
    return pause;
  }

  useEffect(()=>{
    pauseRef.current = callback;
  });

  // First Entrance to Timer
  useEffect(() => {
    // function checkPause(){
    //   pauseRef.current();
    // }
    setTimer(getDeadlineTime(25));
  }, []);


  //Reset Button
  const onClickReset = () => {
      setTimer(getDeadlineTime(25));
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
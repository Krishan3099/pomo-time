import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import TimeDisplay from './components/TimeDisplay';
import Tasks from './components/Tasks';
import SetTask from './components/SetTask';
import { useRef, useState } from 'react';
import { useTransition, animated} from 'react-spring';
import AddTask from './components/AddTask';
import Spinner from 'react-spinkit';
import PomoDirections from './components/PomoDirections';

function App() {
  const [timerShown, setTimerShown] = useState(false)
  const player = useRef()
  const timerAreaDiv = useRef();
  const appRef = useRef();
  const [loadingPlayer, setLoadingPlayer] = useState(true)
  const tasksTransition = useTransition(timerShown,{
    from: {transform: 'scale(1.1)', opacity: 0},
    enter: {transform: 'scale(1)', opacity:1},
    leave: {transform: 'scale(0.9)', y: -900, opacity:0},
  });

  const [tasks, setTasks] = useState([])


  const finishedTask = (id) => {
    console.log('delete', id)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const addTask = (taskText) => {
    const newId = tasks.length + 1
    const newTask = {id: newId, text : taskText}
    setTasks([...tasks, newTask])
  }

  const changeTimerArea = () =>{
    timerAreaDiv.current.classList.toggle('timer-area')
    setTimerShown(!timerShown)
  }

  const hideSpinner = () => {
    setLoadingPlayer(false)
    player.current.classList.add('music-player');
  }
  
  return (
    <div ref={appRef} className="App">
      <Nav/>
      <main>
        <div className='timer-task-area'>
          <div ref={timerAreaDiv} className='task-area'>
            {timerShown ?          
            <TimeDisplay appRef={appRef}/>
            :
            <>
            <SetTask onSub ={changeTimerArea} onAdd={addTask}/>
            
            </>     
            }
            
          </div>
          <div className='task-list'>
         
          {tasksTransition((style1, item) => 
            item ? <animated.div className='item' style={style1}>
              <AddTask onAdd={addTask}/>
              <Tasks onDelete={finishedTask} tasks={tasks} />
            </animated.div> : 
            <animated.div className='item' style={style1}>
              <PomoDirections/>
            </animated.div>
          )}
          </div>

        </div>
        <div className='music-area'>
        {loadingPlayer ? (
          <Spinner
            className="loading text-center"
            name="three-bounce"
            color="white"
            fadeIn="none"
          />
        ) : null}
        <iframe ref={player} onLoad={hideSpinner} title='spotify-widget' src="https://open.spotify.com/embed/playlist/471N195f5jAVs086lzYglw?utm_source=generator&theme=0" width="90%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        
        </div>
        {/* <TimeDisplay/> */}
      </main>
      <Footer/>
    </div>
  );
}

export default App;

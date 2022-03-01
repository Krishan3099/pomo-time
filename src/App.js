import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import TimeDisplay from './components/TimeDisplay';
import Button from './components/Button';
import SetTask from './components/SetTask';
import { useRef, useEffect, useState } from 'react';

function App() {
  const [timerShown, setTimerShown] = useState(false)
  const timerAreaDiv = useRef();
  const [player, setPlayer] = useState('<h1>Music Player</h1>')

  const changeTimerArea = () =>{
    timerAreaDiv.current.classList.toggle('timer-area')
    setTimerShown(!timerShown)
  }

  // useEffect(() =>{
  //   const getPlayer = async () => {
  //     const htmlEmbed = await fetchDeezer()
  //     setPlayer(htmlEmbed)
  //   }

  //   getPlayer()
  // },[])

  // const fetchDeezer = async () =>{
  //   const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/oembed?url=https://www.deezer.com/album/302127&maxwidth=700&maxheight=300&tracklist=true&format=json')
  //   console.log(response)
  //   const htmlFormat = await response.json().html
  //   console.log(htmlFormat)
  //   return htmlFormat
  // }

  // const createMarkup = (html) => {
  //   return {__html: html};
  // }
  
  return (
    <div className="App">
      <Nav/>
      <main>
        <div ref={timerAreaDiv} className='task-area'>
          {timerShown ?
          <TimeDisplay/>
          :
          <SetTask onSub ={changeTimerArea}/>
          }
        </div>
        <div className='music-area'>
        <iframe className='music-player' title='spotify-widget' style={{"border-radius":"12px"}} src="https://open.spotify.com/embed/playlist/471N195f5jAVs086lzYglw?utm_source=generator&theme=0" width="90%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        </div>
        {/* <TimeDisplay/> */}
      </main>
      <Footer/>
    </div>
  );
}

export default App;

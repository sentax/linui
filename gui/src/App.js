import './App.css';
import 'xterm/css/xterm.css';
import io from 'socket.io-client'
import PlatformComponent from './containers/Platform'
import { useState, useEffect, useRef } from 'react'
import { Platform } from './utlis/Classes';
import { AppContext } from './utlis/appContext';

function App() {
  const [loaded, setLoaded] = useState(null)
  const platform = useRef(null)
  useEffect(() => {
    if (platform.current === null) {
      const _socket = io("http://localhost:2222")
      _socket.on("connect", () => {
        console.log("connected");
        platform.current = new Platform(_socket)
        setLoaded(true)
      });
      //error handling
    }
  }, [])
  return (

    loaded
      ?
      <AppContext.Provider value={platform.current}>
        <PlatformComponent platform={platform.current} />
      </AppContext.Provider>
      :
      <div className="loader">
        Loading....
      </div>



  )
}

export default App;

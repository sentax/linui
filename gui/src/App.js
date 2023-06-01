import './App.css';
import 'xterm/css/xterm.css';
import io from 'socket.io-client'
import PlatformComponent from './containers/Platform'
import { v4 } from 'uuid'
import { useState, useEffect, useRef } from 'react'

class Platform {
  constructor(socket) {
    this.socket = socket;
  }

  command(cmd,cb) {
    const id = v4();
    //register event
    this.socket.on(id, (res) => {
      if(cb){
        cb(res)
      }
      if (res.ended === id) {
        this.socket.off(id)
      }
    })

    this.socket.emit("command", { id, cmd });

  }
}


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
      <PlatformComponent platform={platform.current} />
      :
      <div className="loader">
        Loading....
      </div>



  )
}

export default App;

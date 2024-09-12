import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import World from "./components/World";
import axios from 'axios'

axios.defaults.baseURL = 'https://wasteful-gloriana-lliammcbean-f43f8812.koyeb.app/'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [sizes, setSizes] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setSizes({
        width: window.innerHeight,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className='w-screen h-screen overflow-hidden'>
      <div className="w-screen h-screen absolute overflow-hidden">
      <iframe
        width={sizes.width * 1.5}
        height={sizes.height * 1.5}
        src="https://www.youtube.com/embed/FFfdyV8gnWk?autoplay=1&mute=1"
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      </div>
      <div className="w-screen h-screen absolute">
        <Canvas colorManagement shadows camera={{position: [50, 30, 50], far: 5000}}>
          <World />
        </Canvas>
      </div>
      {isLoading && <Loader setIsLoading={setIsLoading} />}
    </div>
  );
}

export default App;

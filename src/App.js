import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Loader from "./components/Loader";
import World from "./components/World";
import axios from 'axios'
import { DrawingProvider } from "./components/context/drawing";

axios.defaults.baseURL = 'https://wasteful-gloriana-lliammcbean-f43f8812.koyeb.app/'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className='w-screen h-screen overflow-hidden bg-black'>
      <div className="w-screen h-screen absolute">
        <Canvas colorManagement shadows camera={{position: [50, 30, 50], far: 5000}}> 
          <DrawingProvider>
            <World isLoading={isLoading}/>
          </DrawingProvider>
        </Canvas>
      </div>
      {isLoading && <Loader setIsLoading={setIsLoading} />}
    </div>
  );
}

export default App;

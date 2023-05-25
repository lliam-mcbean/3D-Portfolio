import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Loader from "./components/Loader";
import World from "./components/World";

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className='w-screen h-screen'>
      <div className="w-screen h-screen absolute">
        <Canvas colorManagement shadows camera={{position: [50, 30, 50], far: 5000}}>
          <World />
        </Canvas>
      </div>
      {/* {isLoading && <Loader setIsLoading={setIsLoading} />} */}
    </div>
  );
}

export default App;

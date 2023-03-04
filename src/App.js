import { Canvas } from "@react-three/fiber";
import World from "./components/World";

function App() {
  return (
    <div className='w-screen h-screen'>
      <Canvas colorManagement shadows camera={{position: [50, 30, 50]}}>
        <World />
      </Canvas>
    </div>
  );
}

export default App;

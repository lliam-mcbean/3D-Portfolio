import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function FixedModel({position,  model, size, scale, onClick, fixed, rotation}) {
    const gltf = useLoader(GLTFLoader, model)
    const gltfClone = gltf.scene.clone()

    return (
        <mesh position={fixed ? position : [0,0,0]} castShadow onClick={() => onClick()} rotation={rotation ? rotation : [0,0,0]}>
            <primitive castShadow scale={scale ? scale : [1,1,1]} position={[0, -1.5, 0]} object={gltfClone} />
        </mesh>
    )
}
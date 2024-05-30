import React from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


export default function Desk({position,  model }) {
    const gltf = useLoader(GLTFLoader, model)

    return (
        <mesh scale={[10,10,10]} rotation={[0, -Math.PI/2, 0]}>
            <primitive position={position} object={gltf.scene} />
        </mesh>
    )
}

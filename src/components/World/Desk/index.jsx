import React, { useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import { useBox } from '@react-three/cannon'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


export default function Desk({position,  model, size}) {
    const gltf = useLoader(GLTFLoader, model)
    const gltfClone = gltf.scene.clone()

    return (
        <mesh scale={[10,10,10]} rotation={[0, -Math.PI/2, 0]} receiveShadow castShadow>
            <primitive castShadow position={position} object={gltfClone} />
        </mesh>
    )
}

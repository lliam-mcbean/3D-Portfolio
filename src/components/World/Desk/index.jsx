import React, { useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import { useBox } from '@react-three/cannon'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader } from 'three'
import * as THREE from 'three'


export default function Desk({position,  model, size}) {
    const texture = useLoader(TextureLoader, '/textures/baked.jpg')
    const material = new THREE.MeshBasicMaterial({map: texture})


    const gltf = useLoader(GLTFLoader, model)

    return (
        <mesh scale={[10,10,10]} rotation={[0, -Math.PI/2, 0]}>
            <primitive position={position} object={gltf.scene} />
        </mesh>
    )
}

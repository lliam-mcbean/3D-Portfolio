import React from 'react'
import { useLoader } from '@react-three/fiber'
import { useBox } from '@react-three/cannon'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


export default function Model({position,  model, size, scale, onClick, fixed}) {
    const gltf = useLoader(GLTFLoader, model)
    const gltfClone = gltf.scene.clone()

    const [ref] = useBox(() => ({
        args: size,
        mass: 0.1,
        position: position,
        material: {restitution: 1, friction: 0.1}
    }))
    return (
        <mesh ref={fixed ? null : ref} position={fixed ? position : [0,0,0]} castShadow onClick={() => onClick()}>
            <primitive castShadow scale={scale ? scale : [1,1,1]} position={[0, -1.5, 0]} object={gltfClone} />
        </mesh>
    )
}

import { Html } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React from 'react'
import { TextureLoader } from 'three'

export default function Wall({position, url, size, rotation}) {
  const screenmap = useLoader(TextureLoader, url)
  return (
    <mesh position={position} rotation={[rotation[0], (Math.PI / 2) + rotation[1], rotation[2]]}>
       <planeGeometry args={size} />
       <meshStandardMaterial map={screenmap}/>
    </mesh>
  )
}

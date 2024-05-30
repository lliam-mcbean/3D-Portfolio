import { useLoader } from '@react-three/fiber'
import React from 'react'
import * as THREE from'three'
import { RGBELoader } from 'three-stdlib'

export default function Sky() {
    const map = useLoader(RGBELoader, './textures/sky.hdr')
  return (
    <mesh position={[0,0,-150]} rotation={[0, Math.PI/2, 0]}>
        <sphereGeometry args={[1000, 100, 100]} />
        <meshBasicMaterial map={map} side={THREE.DoubleSide}/>
    </mesh>
  )
}

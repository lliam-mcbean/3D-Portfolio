import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useEffect } from 'react'

export default function CustomCamera({cameraRef, isOrbit}) {



  return (
    <>
        <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[766.906246058396, 627.6159956734383, 456.2554359120952]}
        rotation={[0, 0, 0]}
        />
        {isOrbit && <OrbitControls 
            target={[200,20,-100]} 
            minDistance={1000} 
            maxDistance={1200}   
            enablePan={false}
            minPolarAngle={Math.PI / 4} // Minimum vertical rotation (up/down)
            maxPolarAngle={Math.PI / 2} // Maximum vertical rotation
            minAzimuthAngle={0} // Minimum horizontal rotation (left/right)
            maxAzimuthAngle={Math.PI / 2} // Maximum horizontal rotation
        />}
    </>
  )
}

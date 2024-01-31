import { Line } from '@react-three/drei'
import React, { useState } from 'react'
import * as THREE from 'three'

export default function Painting({position, size, rotation}) {
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawing, setDrawing] = useState([])

  return (
    <>
    <mesh
    onPointerDown={() => {
      setIsDrawing(true)
    }}
    onPointerUp={() => {
      setIsDrawing(false)
    }}
    onPointerLeave={() => {
      setIsDrawing(false)
    }}
    onPointerMove={((e) => {
      if (isDrawing) {
        setDrawing((prev) => [...prev, e.point])
      }
    })} position={position} rotation={[rotation[0], (Math.PI / 2) + rotation[1], rotation[2]]}>
       <planeGeometry args={size} />
       <meshBasicMaterial transparent opacity={0}/>
      </mesh>
      <mesh>
						<Line
							points={drawing.length > 0 ? drawing : [new THREE.Vector3(0,0,0)]}
							color={0x00ff00}
							lineWidth={1.5}
						/>
			</mesh>
    </>
  )
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Line, Html, Outlines } from '@react-three/drei'
import React from 'react'
import * as THREE from 'three'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDrawing } from '../../context/drawing'


export default function Painting({position, size, rotation }) {
  const {isDrawing, setIsDrawing} = useDrawing()
  const {drawing, submitDrawing, setDrawing} = useDrawing()
  
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
       <meshBasicMaterial />
       <Outlines color='lime' thickness={80}/>
      </mesh>
      {drawing.length !== 0 &&
            <Html transform scale={[10,10,10]} position={[position[0], position[1] - 70, position[2] + 35]} rotation={[rotation[0], (Math.PI / 2) - rotation[1], rotation[2]]}>
            <div className='flex'>
              <div className='p-2 mx-2 border border-2 rounded cursor-pointer text-white hover:text-red-500 ' onClick={() => setDrawing([])}>
                <FontAwesomeIcon icon={faTrash} />
              </div>
            <div onClick={() => {
              submitDrawing()
            }} className='cursor-pointer w-max p-2 border border-2 rounded text-white hover:text-green-500'>Post it!</div>
            </div>
          </Html>
      }
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

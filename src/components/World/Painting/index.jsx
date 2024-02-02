import { Line, Html } from '@react-three/drei'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import * as THREE from 'three'

export default function Painting({position, size, rotation}) {
  const [isDrawing, setIsDrawing] = useState(false)
  const [userDrawings, setUserDrawings] = useState([])
  const [drawing, setDrawing] = useState([])

  useEffect(() => {
    axios.get('/drawings').then((res) => {
      if (res.status === 200) {
        setUserDrawings(res.data)
      }
      console.log('axios response', res)
    })
  }, [])

  const convertCoords = (coords) => {
    const returnValue = coords.map((el) => [el.x, el.y, el.z])
    return returnValue
  }

  const submitDrawing = () => {
    const convertedCoords = convertCoords(drawing)
    axios.post('/drawings', {data: convertedCoords}).then((res) => {
      console.log('this is the drawing submit', res)
    })
  }

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
      <Html position={[position[0] + 30, position[1] - 35, position[2] + 10]} rotation={[rotation[0], (Math.PI / 2) - rotation[1], rotation[2]]}>
        <div onClick={() => {
          submitDrawing()
        }} className='bg-red-500 cursor-pointer'>submit</div>
      </Html>
      <mesh>
						<Line
							points={drawing.length > 0 ? drawing : [new THREE.Vector3(0,0,0)]}
							color={0x00ff00}
							lineWidth={1.5}
						/>
            {userDrawings.length > 0 &&
            userDrawings.map((el) => <Line 
              points={el.map((coord) => new THREE.Vector3(...coord))}
              color={0x00ff00}
              lineWidth={1.5}
            />)
            }
			</mesh>
    </>
  )
}

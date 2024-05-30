/* eslint-disable */
import { Html } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React, { useEffect, useState } from 'react'
import { TextureLoader } from 'three'

export default function Screen2({position, url, size, rotation, setOnScreen, htmlPosition, onScreen, setOnScreen2, onScreen2}) {
  const screenmap = useLoader(TextureLoader, './textures/login.png')
  const [cursor, setCursor] = useState(false)

  useEffect(() => {
    if (cursor) {
      document.body.style.cursor = 'pointer'
    } else {
      document.body.style.cursor = 'auto'
    }
  }, [cursor])

  return (
    <>
    <mesh position={position} rotation={[rotation[0], (Math.PI / 2) + rotation[1], rotation[2]]}>
       <planeGeometry args={size} />
       <meshStandardMaterial transparent opacity={0}/>
        <Html position={htmlPosition} transform scale={5} >
          <div className='overflow-hidden w-[1000px] relative'>
            <iframe title='screen2' style={{border: 'inset'}} className='w-[395px] ml-[300px] mt-[7px] h-[750px]' src={url} frameborder="0"></iframe>
          </div>
        </Html>
    </mesh>
    </>
  )
}
/* eslint-disable */
import { Html } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React, { useEffect, useState } from 'react'
import { TextureLoader } from 'three'

export default function Screen2({position, url, size, rotation, setOnScreen, htmlPosition, onScreen}) {
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
    <mesh onPointerOver={() => setCursor(true)} onPointerOut={() => setCursor(false)} onPointerMissed={() => setCursor(false)} onClick={() => setOnScreen(prev => !prev)} position={position} rotation={[rotation[0], (Math.PI / 2) + rotation[1], rotation[2]]}>
       <planeGeometry args={size} />
       <meshStandardMaterial />
        {onScreen &&
        <Html position={[-2.5, -0.5, 0]} rotation={[0, 0, -0.005]} transform scale={5} >
          <div className='overflow-hidden  relative'>
            <iframe title='screen1' className='w-[428px] h-[733px]' src={url} frameborder="0"></iframe>
          </div>
        </Html>
        }
    </mesh>
    </>
  )
}
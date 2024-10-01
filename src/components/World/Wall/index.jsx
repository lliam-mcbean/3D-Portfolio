/* eslint-disable */
import { Html } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React, { useEffect, useState } from 'react'
import { TextureLoader } from 'three'

export default function Wall({position, url, size, rotation, setOnScreen, htmlPosition, onScreen, setExplore}) {
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
    <mesh onPointerOver={() => setCursor(true)} onPointerOut={() => setCursor(false)} onPointerMissed={() => setCursor(false)} onClick={() => setOnScreen(prev => !prev)} position={position} rotation={[rotation[0], (Math.PI / 2) + rotation[1], rotation[2]]}>
       <planeGeometry args={size} />
       <meshStandardMaterial color={'#7998EE'} emissive={'#7998EE'} emissiveIntensity={1}/>
        {onScreen &&
        <Html position={htmlPosition} transform scale={5}>
          <div className='overflow-hidden w-[970px] relative'>
            <iframe title='screen1' className='w-[990px] border-none  h-[540px]' src={url} frameborder="0"></iframe>
          </div>
          <div onClick={() => {
            setOnScreen(false)
            setExplore(true)
            }} className='cursor-pointer absolute w-[150px] top-0 left-[-200px] p-4 text-2xl text-center border border-2 border-white rounded text-white'>
            EXPLORE THE DESK
          </div>
        </Html>
        }
    </mesh>
    </>
  )
}

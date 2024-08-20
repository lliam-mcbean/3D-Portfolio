/* eslint-disable */
import { Html } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React, { useEffect, useState } from 'react'
import { TextureLoader } from 'three'

export default function Wall({position, url, size, rotation, setOnScreen, htmlPosition, onScreen, setOnScreen2, onScreen2}) {
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
       <meshStandardMaterial map={screenmap}/>
        {onScreen &&
        <Html position={htmlPosition} transform scale={5} >
          <div className='overflow-hidden w-[970px] relative'>
            <iframe title='screen1' style={{border: 'inset'}} className='w-[990px] ml-[6px] h-[540px]' src={url} frameborder="0"></iframe>
          </div>
          <div className={`absolute right-[-180px] rounded-full bg-green-500 top-64 z-10 cursor-pointer text-red-500 ${onScreen2 ? 'rotate-180' : 'rotate-0'}`} onClick={() => {
            if (onScreen2) {
              setOnScreen2(false)
            } else {
              setOnScreen2(true)
            }
          }}>
            <img className='fill-red-500 w-24 h-24' src="./arrow.svg" alt="" />
          </div>
          <div onClick={() => setOnScreen(false)} className='cursor-pointer absolute top-0 left-[-180px] bg-green-500 rounded-full'>
            <img className=' w-24 h-24' src="./x.svg" alt="" />
          </div>
        </Html>
        }
    </mesh>
    </>
  )
}

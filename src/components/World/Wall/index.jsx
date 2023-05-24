import { Html } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React from 'react'
import { TextureLoader } from 'three'

export default function Wall({position, url, size, rotation, setOnScreen, htmlPosition, onScreen}) {
  const screenmap = useLoader(TextureLoader, './textures/blackhole.jpg')
  return (
    <>
    <mesh onClick={() => setOnScreen(prev => !prev)} position={position} rotation={[rotation[0], (Math.PI / 2) + rotation[1], rotation[2]]}>
       <planeGeometry args={size} />
       <meshStandardMaterial map={screenmap}/>
        {onScreen &&
        <Html position={htmlPosition} transform scale={5} >
          <div className='overflow-hidden w-[1000px] relative'>
            <iframe style={{border: 'inset'}} className='w-[990px] ml-[6px] mt-[7px] h-[530px]' src={url} frameborder="0"></iframe>
          </div>
        </Html>
        }
    </mesh>
    </>
  )
}

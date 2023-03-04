import { Debug, Physics, useSphere } from '@react-three/cannon'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import React, { Suspense } from 'react'
import Floor from './Floor'
import Ball from './Ball'
import { useRef } from 'react'
import Model from './Model'

import {pins} from '../../data/pins'
import Shaders from '../Shaders'
import Wall from './Wall'
import Desk from './Desk'
import Box from './Box'

export default function World() {
  const cursor = useRef([15,0,0])
  const spotLight = useRef()

  return (
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <spotLight penumbra={1} position={[0, 20, 0]} intensity={1} ref={spotLight} angle={0.5} distance={100} />
        <spotLight penumbra={1} position={[90, 30, -100]} intensity={0.75} angle={1} distance={100} />
        <spotLight penumbra={1} position={[90, 30, -300]} intensity={0.75} angle={1} distance={1000} />
        <spotLight penumbra={1} position={[90, 30, 0]} intensity={0.75} angle={-1} distance={1000} />
        <spotLight penumbra={1} position={[90, 30, -200]} intensity={0.75} angle={-1} distance={1000} />
        <spotLight penumbra={1} position={[90, 30, -400]} intensity={0.75} angle={-1} distance={1000} />
        <spotLight penumbra={1} position={[-30, 80, 20]} intensity={5} angle={1} distance={40} />
        <Physics>
          {/* <Debug color={'green'} scale={1}> */}
            <Floor cursor={cursor} color={'white'} position={[0,0,0]} />
            <Floor cursor={cursor} color={'white'} position={[0, 0, -100]}/>
            <Floor cursor={cursor} color={'white'} position={[0, 0, -200]}/>
            {/* <Shaders /> */}
            {/* <Wall position={[-75, 20, -100]} url={"https://extend.ai/"} size={[2000, 1250]}/> */}
            {/* <Wall position={[-41.5, 41, -100.1]} url={"https://www.spacejam.com/1996/"} size={[5000, 2650]}/> */}
            <Ball cursor={cursor} spotLight={spotLight}/>
            {pins.coords.map((el) => <Model size={[1, 3, 1]} position={[el[0] - 41, el[1] + 20, el[2] + 141]} model={'/models/pin.gltf'} />)}
            <Desk size={[100,100,100]} position={[-10,0,5]} model={'/models/desk.gltf'} />
            <Box args={[50, 1, 10]} position={[0, 10, 30]} rotation={[0, 0, -Math.PI / 8]} />
            <Box args={[42, 1, 22]} position={[-33, 17.8, 20]} rotation={[0, Math.PI / 2, 0]} transparent={true} />
          {/* </Debug> */}
        </Physics>
      </Suspense>
  )
}

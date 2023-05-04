import { Debug, Physics, useSphere } from '@react-three/cannon'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import React, { Suspense, useState } from 'react'
import Floor from './Floor'
import Ball from './Ball'
import { useRef } from 'react'
import Model from './Model'

import {pins} from '../../data/pins'
import Shaders from '../Shaders'
import Wall from './Wall'
import Desk from './Desk'
import Box from './Box'
import Lights from '../Lights'
import { Html } from '@react-three/drei'
import Loader from '../Loader'

export default function World() {
  const [screen1, setScreen1] = useState(false)

  const cursor = useRef([15,0,0])
  const spotLight = useRef()

  return (
      <Suspense fallback={null}>
        <Lights spotLight={spotLight} />
        <Physics gravity={[0, -40, 0]}>
            <Floor cursor={cursor} color={'white'} position={[0,0,0]} />
            <Floor cursor={cursor} color={'white'} position={[0, 0, -100]}/>
            <Floor cursor={cursor} color={'white'} position={[0, 0, -200]}/>
            {/* <Shaders /> */}
            <Wall position={[-41.75, 41.5, -99.7]} url={"./textures/blackhole.jpg"} size={[124, 64.5]} rotation={[0,0.01,0]}/>
            <Ball cursor={cursor} spotLight={spotLight}/>
            {pins.coords.map((el, i) => <Model key={`pin-${i}`} size={[1, 3, 1]} position={[el[0] - 41, el[1] + 20, el[2] + 141]} model={'/models/pin.gltf'} />)}
            <Desk size={[100,100,100]} position={[-10,0,5]} model={'/models/desk.gltf'} />
            <Box args={[50, 1, 10]} position={[0, 9.7, 30]} rotation={[0, 0, -Math.PI / 8]} />
            <Box args={[42, 1, 22]} position={[-33, 17.8, 20]} rotation={[0, Math.PI / 2, 0]} transparent={true} />
            <Box args={[42, 1, 22]} position={[-33, 33.1, 20]} rotation={[0, Math.PI / 2, 0]} transparent={true} />
            <Box args={[1, 22, 22]} position={[-33, 28, -1.5]} rotation={[0, Math.PI / 2, 0]} transparent={true} />
            <Box args={[1.8, 60, 22]} position={[-33, 28, 36.7]} rotation={[0, Math.PI / 2, 0]} transparent={true} />
            <Box args={[1, 22, 44]} position={[-43, 28, 14.3]} rotation={[0, 0, 0]} transparent={true} />
            <Box args={[47, 1, 134]} position={[20,0,-100]} rotation={[0, 0, 0]} transparent={true} />
            <Box args={[18, 12, 58]} position={[30,0,-101]} rotation={[0, 0, 0]} transparent={true} />
        </Physics>
      </Suspense>
  )
}

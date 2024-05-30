import { Debug, Physics, useSphere } from '@react-three/cannon'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import React, { Suspense, useEffect, useState } from 'react'
import Floor from './Floor'
import Ball from './Ball'
import { useRef } from 'react'
import Model from './Model'
import {pins} from '../../data/pins'
import Wall from './Wall'
import Desk from './Desk'
import Box from './Box'
import Lights from '../Lights'
import Sky from './Sky'
import Painting from './Painting'
import { Line, OrbitControls } from '@react-three/drei'
import axios from 'axios'
import Screen2 from './Wall/Screen2'
import FixedModel from './FixedModel'

export default function World() {
  const [onScreen, setOnScreen] = useState(false)
  const [onScreen2, setOnScreen2] = useState(false)
  const [onWall, setOnWall] = useState(false)
  const [postIts, setPostIts] = useState([])

  const cursor = useRef([15,0,0])
  const spotLight = useRef()

  function scaleCoordinates(coordinates, scaleFactor, pointOfInterest) {
    let translatedCoordinates = coordinates.map(coord => [
        coord[0] - pointOfInterest[0],
        coord[1] - pointOfInterest[1],
        coord[2] - pointOfInterest[2]
    ]);

    let scaledCoordinates = translatedCoordinates.map(coord => [
        coord[0] * scaleFactor,
        coord[1] * scaleFactor,
        coord[2] * scaleFactor
    ]);

    let finalCoordinates = scaledCoordinates.map(coord => [
        coord[0] + pointOfInterest[0],
        coord[1] + pointOfInterest[1],
        coord[2] + pointOfInterest[2]
    ]);

    return finalCoordinates;
  }

  const setDrawingsCallback = (res) => {
    let yIndex = 0
    let xIndex = 0
    if (res.status === 200) {
      const vectors = res.data.map((el, i) => {
        let scaleFactor = 0.15;
        let pointOfInterest = [-47.5, 174, 9];
        if (i !== 0) {
          xIndex += 1
        }
        if (i % 3 === 0 && i !== 0) {
          yIndex += 22
          xIndex = 0
        }
        const scaledCoordinates = scaleCoordinates(el, scaleFactor, pointOfInterest)
        return (
          <mesh position={[0, 40 - yIndex, -60 - ((xIndex * 20) + Math.random() * 2)]}>
            <Line points={scaledCoordinates} color="red" />
            <FixedModel scale={[10,10,10]} size={[7, 12, 7]} position={[-50, 174, 9]} fixed model={'/models/postit.gltf'} />
          </mesh>
        )
      })
      setPostIts(vectors)
    }
  }

  useEffect(() => {
    axios.get('/drawings').then((res) => setDrawingsCallback(res))
  }, [])
  return (
      <Suspense fallback={null}>
        <Lights spotLight={spotLight} />
        <Sky />
        <Physics gravity={[0, -40, 0]}>
          <Debug>
          <Floor cursor={cursor} color={'white'} position={[0,0,0]} />
            <Floor cursor={cursor} color={'white'} position={[0, 0, -100]}/>
            <Floor cursor={cursor} color={'white'} position={[0, 0, -200]}/>
            {/* <Shaders /> */}
            {postIts.length > 0 && postIts}
            <Model scale={[10,10,10]} size={[7, 15, 7]} position={[10,8,-175]} model={'/models/soda.gltf'} />
            {/* <Model scale={[10,10,10]} size={[7, 12, 7]} position={[10,20,-175]} model={'/models/spaceship.gltf'} /> */}
            <Model scale={[10,10,10]} size={[7, 12, 7]} position={[10,8,0]} model={'/models/soda.gltf'} onClick={() => setOnWall((prev) => !prev)}/>
            {/* <Wall position={[-41.75, 41.5, -99.7]} onScreen={onScreen} url={"https://windows-homepage.netlify.app"} onScreen2={onScreen2} setOnScreen2={setOnScreen2} size={[124, 64.5]} rotation={[0,0.01,0]} setOnScreen={setOnScreen}/> */}
            {/* <Screen2 position={[-13, 50.5, -226.5]} onScreen={onScreen} url={"https://lliam-resume.netlify.app"} onScreen2={onScreen2} setOnScreen2={setOnScreen2} size={[50, 93]} rotation={[0.012,-0.972,0]} setOnScreen={setOnScreen}/> */}
            <Painting position={[-60, 174, 9]} size={[95, 110]} rotation={[0,0,0]} setDrawingsCallback={setDrawingsCallback} />
            <Ball cursor={cursor} spotLight={spotLight} onScreen={onScreen} onScreen2={onScreen2} onWall={onWall}/>
            {pins.coords.map((el, i) => <Model key={`pin-${i}`} size={[1, 3, 1]} position={[el[0] - 41, el[1] + 20, el[2] + 141]} model={'/models/pin.gltf'} />)}
            <Desk size={[100,100,100]} position={[-10,0,5]} model={'/models/desk.gltf'} />
            
          </Debug>
        </Physics>
      </Suspense>
  )
}

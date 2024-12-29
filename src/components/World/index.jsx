import { Physics } from '@react-three/cannon'
import React, { Suspense, useEffect, useState } from 'react'
import Floor from './Floor'
import Ball from './Ball'
import { useRef } from 'react'
import Model from './Model'
import {pins} from '../../data/pins'
import Wall from './Wall'
import Desk from './Desk'
import Lights from '../Lights'
import Painting from './Painting'
import { Line } from '@react-three/drei'
import axios from 'axios'
import FixedModel from './FixedModel'
import ShaderModel from './ShaderModel'
import hologramFragment from '../../shaders/hologram/fragment.glsl'
import hologramVertex from '../../shaders/hologram/vertex.glsl'
import ambientLight from '../../shaders/includes/ambientLight.glsl'
import pointLight from '../../shaders/includes/pointLight.glsl'
import directionalLight from '../../shaders/includes/directionalLight.glsl'
import halftoneFragment from '../../shaders/halftone/fragment.glsl'
import halftoneVertex from '../../shaders/halftone/vertex.glsl'
import Collisions from './Collisions'
import CustomCamera from './CustomCamera'
import { gsap } from 'gsap/gsap-core'
import TopoMap from './Desk/TopoMap'
import { useSpring, animated, easings } from '@react-spring/three'
import { useExplore } from '../context/explore'

const newHalftoneFragment = `
  ${ambientLight}
  ${pointLight}
  ${directionalLight}
  ${halftoneFragment}
`

export default function World({isLoading}) {
  const [onScreen, setOnScreen] = useState(false)
  const {explore, setExplore} = useExplore()
  const [onScreen2, setOnScreen2] = useState(false)
  const [postIts, setPostIts] = useState([])
  const [isOrbit, setIsOrbit] = useState(true)

  const cursor = useRef([15,0,0])
  const cameraRef = useRef()
  const spotLight = useRef()

  const { scale, rotation } = useSpring({
    scale: isLoading ? [0, 0, 0] : [1, 1, 1],
    rotation: isLoading ? [0, 0, 0] : [0, Math.PI * 4, 0],
    config: { duration: 1000, easing: easings.easeInOutCubic },
  });

  const tweenCamera = (position, rotation) => {
    setIsOrbit(!isOrbit)
    setExplore(false)
    gsap.to(cameraRef.current.position, {
      x: position[0],
      y: position[1],
      z: position[2],
      duration: 2,
      ease: "power2.inOut"
    });
    gsap.to(cameraRef.current.rotation, {
      x: rotation[0],
      y: rotation[1],
      z: rotation[2],
      duration: 2,
      ease: "power2.inOut"
    });
  };

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
        console.log('this is the element: ', el)
        let scaleFactor = 0.15;
        let pointOfInterest = [-47.5, 174, 9];
        if (i !== 0) {
          xIndex += 1
        }
        if (i % 3 === 0 && i !== 0) {
          yIndex += 22
          xIndex = 0
        }
        if (el.length === 0) {
          return (
            <mesh position={[-10, 40 - yIndex, -68 - ((xIndex * 20) + Math.random() * 2)]}>
              <FixedModel scale={[10,10,10]} size={[7, 12, 7]} position={[-50, 174, 9]} fixed model={'/models/postit.gltf'} />
            </mesh>
          )
        }
        const scaledCoordinates = scaleCoordinates(el, scaleFactor, pointOfInterest)
        return (
          <mesh position={[-10, 40 - yIndex, -68 - ((xIndex * 20) + Math.random() * 2)]}>
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
    /* eslint-disable-next-line*/
  }, [])

  return (
      <Suspense fallback={null}>
        <Lights spotLight={spotLight} />
        <Physics gravity={[0, -40, 0]}>
            <animated.group 
              position={[200,0,-100]}
              scale={scale}
              rotation={rotation}
            >
              <animated.group position={[-200, 0, 100]}>
                <Floor cursor={cursor} color={'white'} position={[0,0,0]} />
                <Floor cursor={cursor} color={'white'} position={[0, 0, -100]}/>
                <Floor cursor={cursor} color={'white'} position={[0, 0, -200]}/>
                {postIts.length > 0 && postIts}
                <Collisions />
                <ShaderModel fragment={hologramFragment} vertex={hologramVertex} position={[-30,12,0]} rotation={[0,0, 0]} scale={3}  model={'/models/spaceship.gltf'} modelName={'Spaceship_FernandoTheFlamingo'}/>
                <ShaderModel fragment={newHalftoneFragment} vertex={halftoneVertex} position={[-30,5,30]} rotation={[0,-3* Math.PI / 4, 0]} scale={10} model={'/models/prop_cannon.gltf'} modelName={'Prop_Cannon'}/>
                <Model scale={[10,10,10]} size={[7, 15, 7]} position={[0,7,-20]} model={'/models/soda.gltf'} />
                <FixedModel fixed scale={[7,7,7]} size={[7, 15, 7]} rotation={[0, Math.PI / 2, 0]} position={[30,6,-90]} model={'/models/keyboard.gltf'} />
                <FixedModel fixed scale={[4,4,4]} rotation={[0, Math.PI / 2, 0]} position={[30,2,-130]} model={'/models/mouse.gltf'} />
                <Wall position={[-41, 40, -98.7]} onScreen={onScreen} url={"https://windows-homepage.netlify.app"} onScreen2={onScreen2} setOnScreen2={setOnScreen2} size={[121.5, 66.5]} rotation={[0,0,0]} setOnScreen={setOnScreen}/>
                {/* <Screen2 position={[-13, 50.5, -226.5]} onScreen={onScreen} url={"https://elegant-panda-184d83.netlify.app/"} onScreen2={onScreen2} setOnScreen2={setOnScreen2} size={[50, 93]} rotation={[0.012,-0.972,0]} setOnScreen={setOnScreen}/> */}
                <Painting position={[-57, 174, 9]} size={[90, 103]} rotation={[0,0,0]} setDrawingsCallback={setDrawingsCallback} />
                <Ball explore={explore} cursor={cursor} spotLight={spotLight} onScreen={onScreen} onScreen2={onScreen2}/>
                {pins.coords.map((el, i) => <Model key={`pin-${i}`} size={[1, 3, 1]} position={[el[0] - 41, el[1] + 20, el[2] + 141]} model={'/models/pin.gltf'} />)}
                <Desk setOnScreen={setOnScreen} tweenCamera={tweenCamera} size={[100,100,100]} position={[-10,0,5]} model={'/models/desk.gltf'} />
                <TopoMap />
              </animated.group>
            </animated.group>
        </Physics>
        <CustomCamera cameraRef={cameraRef} isOrbit={isOrbit}/>
      </Suspense>
  )
}

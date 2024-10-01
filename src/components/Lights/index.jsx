import React, { useRef } from 'react'


export default function Lights({spotLight}) {
  const targetObject = useRef()

  return (
    <>
      <mesh ref={targetObject} position={[0,0,-150]} />
        <ambientLight intensity={0.2} />
        <directionalLight color={"#ffb55c"} target={targetObject.current} intensity={2} position={[300, 200, -250]}/>
        <spotLight penumbra={1} position={[0, 20, 0]} intensity={1000} ref={spotLight} angle={0.5} distance={100} />
        <spotLight penumbra={1} position={[90, 30, -100]} intensity={1200} angle={1} distance={100} />
        <spotLight penumbra={1} position={[90, 30, -300]} intensity={1200} angle={1} distance={1000} />
        <spotLight penumbra={1} position={[90, 30, 0]} intensity={1200} angle={-1} distance={1000} />
        <spotLight penumbra={1} position={[90, 230, -250]} intensity={120000} angle={-1} distance={1000}/>
        <spotLight penumbra={1} position={[90, 30, -400]} intensity={1200} angle={-1} distance={1000} />
        <spotLight penumbra={1} color={"#6cc7c0"} position={[130, 280, 220]} intensity={1200000} angle={1} distance={400}/>
    </>
  )
}

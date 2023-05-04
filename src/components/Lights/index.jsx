import React from 'react'

export default function Lights({spotLight}) {
  return (
    <>
        <ambientLight intensity={0.2} />
        <spotLight penumbra={1} position={[0, 20, 0]} intensity={1} ref={spotLight} angle={0.5} distance={100} />
        <spotLight penumbra={1} position={[90, 30, -100]} intensity={0.75} angle={1} distance={100} />
        <spotLight penumbra={1} position={[90, 30, -300]} intensity={0.75} angle={1} distance={1000} />
        <spotLight penumbra={1} position={[90, 30, 0]} intensity={0.75} angle={-1} distance={1000} />
        <spotLight penumbra={1} position={[90, 30, -200]} intensity={0.75} angle={-1} distance={1000} />
        <spotLight penumbra={1} position={[90, 30, -400]} intensity={0.75} angle={-1} distance={1000} />
        <spotLight penumbra={1} position={[-30, 80, 20]} intensity={5} angle={1} distance={40} />
    </>
  )
}

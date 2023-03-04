import { useBox } from '@react-three/cannon'
import React from 'react'

export default function Box({args, rotation, position, transparent}) {
    const [ref, api] = useBox(() => ({
        mass: 0,
        args,
        position,
        rotation,
        material: {restitution: 0.1, friction: 0.1}
    }))
  return (
   <mesh ref={ref} onPointerMove={(e) => {
    console.log(e.point)
   }}>
    <boxGeometry args={args} />
    <meshStandardMaterial color={'black'} transparent={transparent} opacity={0} />
   </mesh>
  )
}

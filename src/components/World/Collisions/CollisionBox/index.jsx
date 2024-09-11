import { useBox } from '@react-three/cannon'
import React from 'react'

export default function CollisionBox({position, args}) {
    const [ref] = useBox(() => ({
        mass: 0,
        args: args,
        position: position,
        material: {restitution: 0, friction: 0}
    }))
  return (
    <mesh ref={ref}>

    </mesh>
  )
}

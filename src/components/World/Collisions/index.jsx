import React from 'react'
import CollisionBox from './CollisionBox'

export default function Collisions() {
  return (
    <>
        {/* keyboard */}
        <CollisionBox position={[27,3,-91]} args={[18, 6,52]} />
        {/* mouse pad */}
        <CollisionBox position={[18,0.25,-100]} args={[45, 0.5,128]} />
        {/* mouse */}
        <CollisionBox position={[30.75,2,-130]} args={[12, 4.5, 7]} />
        {/* display case */}
        <CollisionBox position={[-28, 10, 13]} args={[20,20,60]} />
    </>
  )
}

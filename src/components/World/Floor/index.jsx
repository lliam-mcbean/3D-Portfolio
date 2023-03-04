import { usePlane } from '@react-three/cannon'
import React, { useState } from 'react'

export default function Floor({cursor, position, color}) {
    const [isOver, setIsOver] = useState(false)
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: position }))
    return (
      <>
        <mesh ref={ref} receiveShadow onPointerEnter={() => setIsOver(true)} onPointerLeave={() => setIsOver(false)} onPointerMove={(e) => {
          if (isOver) {
            cursor.current = e.point.toArray()
          }
        }}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color={color} transparent opacity={0}/>
        </mesh>
      </>
    )
}

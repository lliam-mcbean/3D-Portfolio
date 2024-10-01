import { Outlines } from '@react-three/drei'
import React, { useState } from 'react'

export default function FocusItem({model, position, tweenCamera, nodeString, rotation, callback, tweenPosition, tweenRotation}) {
    const [hovered, hover] = useState(false)

    console.log('this is the ccallback', callback)

  return (
    <mesh onClick={() => {
      if (callback) {
        callback((prev) => !prev)
      }
      tweenCamera(tweenPosition, tweenRotation)
      }} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} position={position} rotation={rotation} scale={model.nodes[nodeString] && [model.nodes[nodeString].scale.x * 10, model.nodes[nodeString].scale.y * 10, model.nodes[nodeString].scale.z * 10]} geometry={model.nodes[nodeString].geometry}  material={model.nodes[nodeString].material}>
        {hovered && <Outlines thickness={5} color={"#43a29c"} />}
    </mesh>
  )
}

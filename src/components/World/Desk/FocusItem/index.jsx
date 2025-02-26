import { Outlines } from '@react-three/drei'
import React, { useState } from 'react'
import { useDrawing } from '../../../context/drawing'

export default function FocusItem({model, title, position, tweenCamera, nodeString, rotation, callback, tweenPosition, tweenRotation}) {
  const [hovered, hover] = useState(false)
  const {isDrawing} = useDrawing()

  return (
    <mesh onClick={() => {
      if (callback) {
        callback((prev) => !prev)
      }
      if (!isDrawing) {
        tweenCamera(tweenPosition, tweenRotation)
      }
      }} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} position={position} rotation={rotation} scale={model.nodes[nodeString] && [model.nodes[nodeString].scale.x * 10, model.nodes[nodeString].scale.y * 10, model.nodes[nodeString].scale.z * 10]} geometry={model.nodes[nodeString].geometry}  material={model.nodes[nodeString].material}>
        {hovered && <Outlines thickness={5} color={"#43a29c"} />}
    </mesh>
  )
}

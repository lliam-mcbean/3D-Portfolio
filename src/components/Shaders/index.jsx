import React from 'react'
import Wall from '../World/Wall'

export default function Shaders() {
  return (
    <>
        <Wall position={[-75, 20, 0]} url={"https://circle-pattern.netlify.app/"} size={[1000, 725]}/>
        <Wall position={[-75, 20, -26]} url={"https://harmonicmotion.netlify.app/"} size={[1000, 725]}/>
        <Wall position={[-75, 39, -13]} url={"https://animatedgalaxy.netlify.app/"} size={[1000, 725]}/>
    </>
  )
}

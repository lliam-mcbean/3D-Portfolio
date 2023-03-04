import { Html } from '@react-three/drei'
import React from 'react'

export default function Wall({position, url, size}) {
  return (
    <mesh position={position} rotation={[0, Math.PI / 2, 0]} >
        <Html occlude transform>
            <div className='w-100 h-100 bg-red-500 text-white'>
                <iframe title="embed" width={size[0]} height={size[1]} src={url} />
            </div>
        </Html>
    </mesh>
  )
}

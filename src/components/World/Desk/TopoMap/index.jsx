import React, { useRef } from 'react'
import fragment from '../../../../shaders/topo/fragment.glsl'
import vertex from '../../../../shaders/topo/vertex.glsl'
import * as THREE from 'three'
import { useFrame, useLoader } from '@react-three/fiber'

export default function TopoMap() {
  const colorMap = useLoader(THREE.TextureLoader, './textures/squamishtopo.jpg')
  const materialRef = useRef();
  const meshRef = useRef()

  useFrame((state) => {
    const { clock } = state;
    if (materialRef.current.uniforms) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} position={[169,123, -390]} onPointerMove={(e) => {
      if (meshRef.current) {
        const centeredUV = {
          x: e.uv.x - 0.5,
          y: e.uv.y - 0.5
        }
        meshRef.current.rotation.x = centeredUV.y * 0.2
        meshRef.current.rotation.y = - centeredUV.x * 0.2
      }
    }}>
        <planeGeometry args={[250,155, 200, 200]}/>
        <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTexture: new THREE.Uniform(colorMap),
          uTime: {value: 0}
        }}
        vertexShader={vertex}
        fragmentShader={fragment}
        />
    </mesh>
  )
}

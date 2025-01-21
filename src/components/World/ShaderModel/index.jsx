import { useFrame, useLoader } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function ShaderModel({fragment, vertex, position, rotation, model, modelName, scale}) {
    const gltf = useLoader(GLTFLoader, model)
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2)
    }
    const geometry = gltf.nodes[modelName].geometry

    const shaderRef = useRef()

    const uniforms = useMemo(
        () => ({
          uTime: {
            value: 0.0,
          },
          uColor: {value: new THREE.Color('#11b9dc')},
          uResolution: {value: new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)},
        }), [sizes.width, sizes.pixelRatio, sizes.height]
      );

    useFrame(({clock}) => {
        shaderRef.current.material.uniforms.uTime.value = clock.getElapsedTime();

        if (modelName === 'Spaceship_FernandoTheFlamingo') {
            shaderRef.current.rotation.y += 0.005
        }
      });
  return (
    <mesh ref={shaderRef} position={position} rotation={rotation} geometry={geometry} scale={scale}>
        <shaderMaterial
        transparent
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        />
    </mesh>
  )
}

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {createNoise3D} from 'simplex-noise';
import { useTexture } from '@react-three/drei';

export default function LightBugParticles({ count }) {
    const meshRef = useRef();
    const noise3D = createNoise3D(Math.random); 
    const particleTexture = useTexture('/textures/particles.png')
  
    const particles = useMemo(() => {
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions.set([
          THREE.MathUtils.randFloatSpread(1000), 
          THREE.MathUtils.randFloatSpread(1000), 
          THREE.MathUtils.randFloatSpread(1000), 
        ], i * 3);
      }
      return positions;
    }, [count]);
  
    useFrame(({ clock }) => {
      const time = clock.getElapsedTime() * 0.00001;
  
      for (let i = 0; i < count; i++) {
        const index = i * 3;
  
        const x = particles[index];
        const y = particles[index + 1];
        const z = particles[index + 2];
  
        const offsetX = noise3D(x * 0.005, y * 0.005, z * 0.005 + time) * 0.5; // Adjust noise parameters for smoother movement
        const offsetY = noise3D(x * 0.005, y * 0.005, z + time) * 0.5;
  
        meshRef.current.geometry.attributes.position.array[index] += offsetX;
        meshRef.current.geometry.attributes.position.array[index + 1] += offsetY;
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    });
  
    return (
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={5}
          sizeAttenuation={true}
          color="yellow"
          transparent={true}
          opacity={1}
          depthWrite={false}
          alphaMap={particleTexture}
        />
      </points>
    );
};
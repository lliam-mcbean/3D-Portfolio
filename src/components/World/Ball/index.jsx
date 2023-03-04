import { useSphere } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'


export default function Ball({cursor, spotLight}) {
    const [ref, api] = useSphere(() => ({
        mass: 0.1,

        args: [1, 32, 32],
        position: [(Math.random() * -20), Math.random() * 2, (Math.random() * -20)],
        material: {restitution: 1, friction: 0.1}
    }))
    const pos = useRef({})
    const vel = useRef({})

    useEffect(() => {
        api.position.subscribe(v => pos.current = v)
        api.velocity.subscribe(v => vel.current = v)
    }, [])

    
    useFrame(({camera}) => {
        // frictional force to slow particle down
        const vec2 = new THREE.Vector3(-vel.current[0], 0, -vel.current[2])
        api.applyForce(vec2.toArray(), pos.current)

        // force applied to position of cursor, dependant on distance to cursor
        const vec3 = new THREE.Vector3((cursor.current[0] - pos.current[0]), -1, (cursor.current[2] - pos.current[2]))
        api.applyForce(vec3.toArray(), pos.current)

        // camera follows object3d
        camera.position.set(50 + pos.current[0], 30 + pos.current[1], 50 + pos.current[2])

        // spotlight follows and targets object
        spotLight.current && spotLight.current.position.set(cursor.current[0], 20, cursor.current[2])
        spotLight.current.target = ref.current
    })
    return (
        <mesh ref={ref} castShadow>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial attach='material' color='lightblue' />
        </mesh>
    )
}

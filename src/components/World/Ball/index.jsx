import { useSphere } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'


export default function Ball({cursor, spotLight, explore}) {
    const [ref, api] = useSphere(() => ({
        mass: 1,
        args: [2, 32, 32],
        position: [(Math.random() * -20), Math.random() * 2 + 5, (Math.random() * -20)],
        material: {restitution: 1, friction: 0.1}
    }))
    const pos = useRef({})
    const vel = useRef({})

    useEffect(() => {
        api.position.subscribe(v => pos.current = v)
        api.velocity.subscribe(v => vel.current = v)
        // eslint-disable-next-line
    }, [])

    
    useFrame(({camera}) => {

        if (api && api.position) {
            if (explore) {
            // camera follows object3d
            camera.position.set(66 + pos.current[0], 40 + pos.current[1], 66 + pos.current[2])
            camera.rotation.setFromVector3(new THREE.Vector3(
                -0.5404195002705843,
                0.7088280414581604,
                0.3723478924339099
                ))
            }
        // } else if (onWall) {
        //     camera.position.set(150, 100, 0)
        //     camera.rotation.set(0,Math.PI / 2,0)
        // } else if (onScreen2) {
        //     camera.position.set(40, 50, -140)
        //     camera.rotation.set(0,Math.PI / 5,0)
        // } else {
        //     camera.position.set(100, 50, -100)
        //     camera.rotation.set(0,Math.PI / 2,0)
        // }
        // frictional force to slow particle down
        const vec2 = [-vel.current[0], 0, -vel.current[2]]
        api.applyForce(vec2, pos.current)

        // force applied to position of cursor, dependant on distance to cursor
        const vec3 = [(cursor.current[0] - pos.current[0]), 0, (cursor.current[2] - pos.current[2])]
        api.applyForce(vec3, pos.current)

        // spotlight follows and targets object
        spotLight.current && spotLight.current.position.set(cursor.current[0], 20, cursor.current[2])
        spotLight.current.target = ref.current
        api.rotation.set(0,0,0)
        }
    })
    return (
        <mesh ref={ref} castShadow>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial color={'orange'} />
        </mesh>
    )
}

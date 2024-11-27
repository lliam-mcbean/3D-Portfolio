import React from 'react'
import FocusItem from './FocusItem'
import { useGLTF } from '@react-three/drei'
import LightBugParticles from './Lightbug'


export default function Desk({position,  model, tweenCamera, setOnScreen }) {
    const gltf = useGLTF(model)
    const painting = useGLTF('/models/painting.glb')
    const map = useGLTF('/models/map.gltf')
    const monitor1 = useGLTF('/models/monitor1.gltf')
    const monitor2 = useGLTF('/models/monitor2.gltf')

    return (
        <>
            <mesh scale={[10,10,10]} rotation={[0, -Math.PI/2, 0]}>
                <primitive position={position} object={gltf.scene} />
            </mesh>
            {/* <LightBugParticles count={500} /> */}
            <FocusItem title={'painting'} model={painting} tweenPosition={[300, 100, -10]} tweenRotation={[0, Math.PI / 2, 0]} position={[-58, 174, 9]} nodeString={"Cube033"} tweenCamera={tweenCamera} rotation={[0, Math.PI / 2, 0]} />
            <FocusItem model={map} nodeString={"Cube077"} tweenPosition={[180, 100, -10]} tweenRotation={[0, 0, 0]} position={[169,123,-370]} tweenCamera={tweenCamera} rotation={[0,-Math.PI / 2,0]} />
            <group>
                <FocusItem model={monitor1} callback={setOnScreen} nodeString={"Cube036"} tweenPosition={[190, 100, -100]} tweenRotation={[0, Math.PI / 2, 0]} position={[-43, 40, -98.7]} tweenCamera={tweenCamera} rotation={[0,-Math.PI / 2,0]} />
            </group>
            <group position={[0,55,-200]} rotation={[0,-0.8,0]} >
                <FocusItem model={monitor2} nodeString={"Cube037"} tweenPosition={[150, 80, -70]} tweenRotation={[0, 0.8, 0]} position={[0,0,0]} tweenCamera={tweenCamera} rotation={[Math.PI / 2,Math.PI / 2,0]} />
            </group>
        </>
    )
}

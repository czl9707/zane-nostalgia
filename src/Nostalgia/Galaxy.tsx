import * as React from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { Outlines } from '@react-three/drei'
import { Color, Object3D, OrthographicCamera, Vector3 } from 'three';
import { degToRad, randInt } from 'three/src/math/MathUtils.js';

const SunSize = 1
const d = 20;
const outlinesThickness = 0.01;
const WHITE = 0xffffff;
const BLACK = 0x000000;

function Galaxy() {
    const orthCamera = new OrthographicCamera(- d, d, d, d, 1, 50)
    orthCamera.position.set(0, 0, 10);
    orthCamera.zoom = 50

    return (
        <Canvas
            scene={{ background: new Color(0x000000) }}
            camera={orthCamera}
        >
            <Sun />
            <Planet radius={0.1} distance={0.5} speed={15} />
            <Planet radius={0.15} distance={1.25} speed={8} />
            <Planet radius={0.2} distance={3} speed={4} />
            <Planet radius={0.4} distance={7} speed={2} incline={0.4} />
            <Planet radius={0.5} distance={17} speed={2} />
        </Canvas >
    )
}

function Sun() {
    return (
        <>
            <pointLight position={[0, 0, 0]} intensity={0.2} decay={0.2} />
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[SunSize]} />
                <meshStandardMaterial color={WHITE} emissive={WHITE} emissiveIntensity={10} />
                <Outlines screenspace thickness={outlinesThickness} color={BLACK} />
            </mesh>
        </>
    );
}

interface PlanetProps {
    radius: number,
    distance: number,
    speed: number,
    incline?: number,
}


function Planet({ radius, distance, speed, incline = 0.2 }: PlanetProps) {
    const objRef = React.useRef<Object3D>(null);
    const axis = new Vector3(0, 1, 0);

    React.useEffect(() => {
        objRef.current?.rotateZ(-incline);
        objRef.current?.rotateOnAxis(axis, degToRad(degToRad(speed) * randInt(20, 1000)));
    }, [objRef])

    useFrame(() => {
        objRef.current?.rotateOnAxis(axis, degToRad(degToRad(speed)))
    })

    return (
        <object3D ref={objRef}>
            <mesh castShadow receiveShadow position={[distance + SunSize, 0, 0]}>
                <sphereGeometry args={[radius]} />
                <meshStandardMaterial color={WHITE} />
                <Outlines screenspace thickness={outlinesThickness} color={WHITE} />
            </mesh>
        </object3D>
    )
}

export default Galaxy;
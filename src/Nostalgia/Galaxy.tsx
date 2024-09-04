import * as React from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { Outlines, Point, PointMaterial, Points } from '@react-three/drei'
import { BufferGeometry, Color, Euler, Group, OrthographicCamera, Path, Vector3 } from 'three';
import { degToRad, MathUtils, randInt } from 'three/src/math/MathUtils.js';
import { Bloom, EffectComposer, Selection, Select } from '@react-three/postprocessing';

const SunSize = 1
const d = 20;
const outlinesThickness = 0.01;
const WHITE = 0xffffff;
const BLACK = 0x000000;

function Galaxy() {
    const orthCamera = new OrthographicCamera(- d, d, d, d, 1, 200)
    orthCamera.position.set(0, 0, 30);
    orthCamera.zoom = 50

    return (
        <Canvas
            scene={{ background: new Color(0x000000) }}
            camera={orthCamera}
        >
            <Sun />
            <Background />

            <Planet radius={0.1} distance={0.5} speed={15} />
            <Planet radius={0.15} distance={1.25} speed={8} />
            <Planet radius={0.2} distance={3} speed={4} />
            <Planet radius={0.4} distance={7} speed={2} />
            <Planet radius={0.5} distance={12} speed={1.3} incline={0.3} />
            <Planet radius={0.3} distance={18} speed={0.5} />
        </Canvas >
    )
}

function Sun() {
    return (
        <>
            <pointLight position={[0, 0, 0]} intensity={0.2} decay={0.2} />
            <Selection>
                <EffectComposer autoClear={false}>
                    <Bloom luminanceThreshold={0.9} luminanceSmoothing={1} intensity={.1} />
                </EffectComposer>
                <Select enabled>
                    <mesh position={[0, 0, 0]}>
                        <sphereGeometry args={[SunSize]} />
                        <meshStandardMaterial toneMapped={false}
                            color={WHITE} emissive={WHITE} emissiveIntensity={10} />
                        <Outlines screenspace thickness={outlinesThickness} color={BLACK} />
                    </mesh>
                </Select>
            </Selection>
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
    const pivotRef = React.useRef<Group | null>(null);

    React.useEffect(() => {
        pivotRef.current?.rotateOnWorldAxis(new Vector3(-1, 0, 1), -incline);
        pivotRef.current?.rotateY(degToRad(speed) * randInt(10, 1000));
        // console.log(pivotRef.current?.getWorldDirection(new Vector3(0, 0, 0)));
    }, [pivotRef])


    useFrame(() => {
        pivotRef.current?.rotateY(degToRad(speed / 30))
    })

    return (
        <>
            <group ref={pivotRef} position={[0, 0, 0]}>
                <mesh castShadow receiveShadow position={[distance + SunSize, 0, 0]}>
                    <sphereGeometry args={[radius]} />
                    <meshStandardMaterial color={WHITE} />
                    <Outlines screenspace thickness={outlinesThickness} color={WHITE} />
                </mesh>
                <lineLoop geometry={CircleLineGeometry(distance + SunSize)} rotation={new Euler(Math.PI / 2, 0, 0)}>
                    <lineBasicMaterial color={0x444444} linewidth={1} />
                </lineLoop>
            </group>
        </>
    )
}

function Background() {
    return (
        <>
            <BackgroundLayer color={WHITE} />
            <BackgroundLayer color={0x666666} />
            <BackgroundLayer color={0x222222} />
        </>
    )
}

function BackgroundLayer({ color }: { color: unknown }) {
    const count = 750;

    const positions = React.useMemo(() => Array.from({ length: count }, (i) => [
        MathUtils.randFloatSpread(40),
        MathUtils.randFloatSpread(20),
        MathUtils.randFloatSpread(1) - 35,
    ]), []);

    return (
        <Points limit={count}>
            <PointMaterial vertexColors size={.2}
                color={color} emissive={color}
            />
            {positions.map((position, i) => (
                <Point key={i} position={new Vector3(...position)} />
            ))}
        </Points>
    )
}

function CircleLineGeometry(radius: number) {
    return new BufferGeometry().setFromPoints(
        new Path().absarc(0, 0, radius, 0, Math.PI * 2).getSpacedPoints(radius * radius * 50)
    );
}

export default Galaxy;
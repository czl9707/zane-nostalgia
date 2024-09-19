"use client"

import * as React from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { Outlines, Point, PointMaterial, Points } from '@react-three/drei'
import * as THREE from 'three';
import { MathUtils, randInt } from 'three/src/math/MathUtils.js';
import { Bloom, EffectComposer, Selection, Select } from '@react-three/postprocessing';

const SunSize = 1
const d = 20;
const outlinesThickness = 0.01;

const WHITE = 0xffffff;
const DARKGREY = 0x666666;
const LIGHTGREY = 0x222222;
const BLACK = 0x000000;

function Page() {
    const orthCamera = React.useMemo(() => {
        const orthCamera = new THREE.OrthographicCamera(- d, d, d, d, 1, 200)
        orthCamera.position.set(0, 0, 100);
        orthCamera.zoom = 50
        return orthCamera;
    }, []);

    return (
        <div style={{ zIndex: 0, width: "100%", height: "100%", position: "fixed" }}>
            <Canvas
                scene={{ background: new THREE.Color(0x000000) }}
                camera={orthCamera}
            >
                <Sun />
                <Background />

                <Planet radius={0.1} distance={0.5} speed={0.5} />
                <Planet radius={0.13} distance={1.25} speed={0.7} />
                <Planet radius={0.15} distance={3} speed={0.4} />
                <Planet radius={0.2} distance={7} speed={0.5} incline={0.17} />
                <Planet radius={0.25} distance={12} speed={0.5} />
                <Belt radius={0.5} distance={17} speed={0.1} />
                <Planet radius={0.4} distance={25} speed={0.08} />
                <Planet radius={0.45} distance={33} speed={0.06} />
                <Planet radius={0.2} distance={43} speed={0.1} />
            </Canvas >
        </div>
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
    const planetRef = React.useRef<THREE.Mesh | null>(null);
    const [currentStep, setCurrentStep] = React.useState<number>(randInt(0, 1000));

    const orbitTrackCurve = React.useMemo(
        () => OrbitTrackCurve(distance + SunSize, incline),
        [distance, incline])
    const orbitTrackGeometry = React.useMemo(
        () => new THREE.BufferGeometry().setFromPoints(
            orbitTrackCurve.getSpacedPoints((distance + SunSize) * 20)
        ),
        [orbitTrackCurve, distance])


    useFrame(() => {
        setCurrentStep(currentStep + (speed / 2000));
        if (currentStep > orbitTrackCurve.getLength()) {
            setCurrentStep(currentStep % orbitTrackCurve.getLength())
        }

        const currentPoint = orbitTrackCurve.getPoint(currentStep);

        if (planetRef.current) {
            planetRef.current.position.x = currentPoint.x;
            planetRef.current.position.y = currentPoint.y;
            planetRef.current.position.z = currentPoint.z;
        }
    })


    return (
        <>
            <mesh castShadow receiveShadow ref={planetRef}>
                <sphereGeometry args={[radius]} />
                <meshStandardMaterial color={WHITE} />
                <Outlines screenspace thickness={outlinesThickness} color={WHITE} />
            </mesh>
            <lineLoop geometry={orbitTrackGeometry}>
                <lineBasicMaterial color={0x444444} linewidth={1} />
            </lineLoop>
        </>
    )
}

function Belt({ radius, distance, speed, incline = 0.2 }: PlanetProps) {
    const beltRef = React.useRef<THREE.Points | null>(null);

    const points = React.useMemo(
        () => {
            const curvePoints = OrbitTrackCurve(distance + SunSize, 0)
                .getSpacedPoints((distance + SunSize) * 30);
            return curvePoints.map(
                p => Array.from({ length: 5 }).map(
                    () => new THREE.Vector3(
                        p.x + MathUtils.randFloatSpread(radius),
                        p.y + MathUtils.randFloatSpread(radius),
                        p.z + MathUtils.randFloatSpread(0.1),
                    )
                )
            ).flat();
        },
        [],
    )

    React.useEffect(() => {
        if (beltRef.current) {
            beltRef.current.rotateZ(-incline)
            beltRef.current.rotateX(-incline);
        }
    }, [])

    useFrame(() => {
        beltRef.current?.rotateY(speed / 300);
    })

    return (
        <Points limit={points.length} ref={beltRef}>
            <PointMaterial vertexColors size={.2}
                color={DARKGREY} emissive={DARKGREY}
            />
            {points.map((p, i) => (
                <Point key={i} position={p} />
            ))}
        </Points>
    )
}



function Background() {
    return (
        <>
            <BackgroundLayer color={WHITE} />
            <BackgroundLayer color={DARKGREY} />
            <BackgroundLayer color={LIGHTGREY} />
        </>
    )
}

function BackgroundLayer({ color }: { color: unknown }) {
    const count = 750;

    const positions = React.useMemo(() => Array.from({ length: count }, () => new THREE.Vector3(
        MathUtils.randFloatSpread(40),
        MathUtils.randFloatSpread(20),
        MathUtils.randFloatSpread(1) - 35,
    )), []);

    return (
        <Points limit={count}>
            <PointMaterial vertexColors size={.2}
                color={color} emissive={color}
            />
            {positions.map((p, i) => (
                <Point key={i} position={p} />
            ))}
        </Points>
    )
}

function OrbitTrackCurve(radius: number, incline: number) {
    const points = new THREE.Path().absarc(0, 0, radius, 0, Math.PI * 2)
        .getSpacedPoints(radius * 20)
        .map(p => new THREE.Vector3(p.x, p.y, 0));

    const tempMesh = new THREE.Mesh(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial());

    tempMesh.rotateX(Math.PI / 2 + incline)
    tempMesh.rotateY(-incline);
    tempMesh.updateMatrixWorld(true);

    return new THREE.CatmullRomCurve3(points.map(p => p.applyMatrix4(tempMesh.matrixWorld)), true);
}

export default Page;
"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import AbstractModel from "./AbstractModel";
import Particles from "./Particles";

export default function ProductStage() {
    return (
        <Canvas shadows camera={{ position: [0, 0, 4.5], fov: 45 }}>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1.5}
                castShadow
            />
            {/* Rim Lights */}
            <pointLight position={[-5, 0, -5]} intensity={2} color="#D4AF37" distance={10} />
            <pointLight position={[5, 0, -5]} intensity={1} color="#B76E79" distance={10} />

            {/* Environment */}
            <Environment preset="city" />

            {/* Content */}
            <Suspense fallback={null}>
                <AbstractModel />
                <Particles count={60} />
            </Suspense>

            {/* Shadows */}
            <ContactShadows resolution={512} scale={10} blur={2} opacity={0.5} far={1} color="#000000" />

            {/* Controls */}
            <OrbitControls
                enableZoom={true}
                enablePan={false}
                minPolarAngle={Math.PI / 2.5}
                maxPolarAngle={Math.PI / 1.5}
                minDistance={3}
                maxDistance={8}
                autoRotate={false}
            />
        </Canvas>
    );
}

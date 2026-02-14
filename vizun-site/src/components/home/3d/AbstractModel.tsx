"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function AbstractModel() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        // Bobbing animation
        meshRef.current.position.y = Math.sin(time / 2) * 0.2;
        // Slow rotation independent of controls
        meshRef.current.rotation.x = Math.sin(time / 4) * 0.2;
        meshRef.current.rotation.z = Math.cos(time / 4) * 0.2;
    });

    return (
        <group dispose={null}>
            <mesh ref={meshRef} scale={1.8}>
                <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                {/* Premium Material: Gold/Black Metallic */}
                <MeshDistortMaterial
                    color="#1C1C1C"
                    emissive="#D4AF37"
                    emissiveIntensity={0.2}
                    roughness={0.1}
                    metalness={1}
                    distort={0.3}
                    speed={2}
                />
            </mesh>
            {/* Inner Wireframe Glow */}
            <mesh scale={1.9} position={[0, Math.sin(0) * 0.2, 0]}> {/* Approximate position match */}
                <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                <meshBasicMaterial color="#D4AF37" wireframe transparent opacity={0.1} />
            </mesh>
        </group>
    );
}

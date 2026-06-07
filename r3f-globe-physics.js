import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function GlobeParticles() {
    const meshRef = useRef();
    
    // Rotate the particle sphere over time
    useFrame((state) => {
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    });

    return (
        <points ref={meshRef}>
            <sphereGeometry args={[2, 64, 64]} />
            <pointsMaterial 
                color="#a5e844" 
                size={0.02} 
                transparent 
                opacity={0.8} 
            />
        </points>
    );
}

export default function PhysicsGlobe() {
    return (
        <div className="h-full w-full bg-black">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <GlobeParticles />
                <OrbitControls enableZoom={true} />
            </Canvas>
        </div>
    );
}

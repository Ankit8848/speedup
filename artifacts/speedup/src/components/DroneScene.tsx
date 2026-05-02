import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export function DroneModel({ activePart = null }: { activePart?: string | null }) {
  const group = useRef<THREE.Group>(null);
  const rotors = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    // Spin rotors
    rotors.current.forEach((rotor) => {
      if (rotor) rotor.rotation.y += delta * 20;
    });

    if (group.current && !activePart) {
      // Gentle hover if no part is active
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      group.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: "#0a1628", 
    roughness: 0.2, 
    metalness: 0.8,
    emissive: activePart === 'sensors' ? "#00D4FF" : "#000000",
    emissiveIntensity: activePart === 'sensors' ? 0.5 : 0
  });

  const armMaterial = new THREE.MeshStandardMaterial({ 
    color: "#1a2638", 
    roughness: 0.5, 
    metalness: 0.5 
  });

  const rotorMaterial = new THREE.MeshStandardMaterial({ 
    color: "#00D4FF", 
    transparent: true, 
    opacity: 0.6,
    emissive: "#00D4FF",
    emissiveIntensity: activePart === 'battery' ? 1 : 0.2
  });

  const payloadMaterial = new THREE.MeshStandardMaterial({
    color: "#ffffff",
    roughness: 0.1,
    metalness: 0.9,
    emissive: activePart === 'payload' ? "#7B2FFF" : "#000000",
    emissiveIntensity: activePart === 'payload' ? 0.8 : 0
  });

  const navMaterial = new THREE.MeshStandardMaterial({
    color: "#000000",
    emissive: activePart === 'nav' ? "#00D4FF" : "#000000",
    emissiveIntensity: activePart === 'nav' ? 1 : 0.1
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={group}>
        {/* Main Body */}
        <mesh material={bodyMaterial}>
          <boxGeometry args={[1, 0.3, 1]} />
        </mesh>
        
        {/* AI Nav dome */}
        <mesh material={navMaterial} position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
        </mesh>

        {/* Payload */}
        <mesh material={payloadMaterial} position={[0, -0.3, 0]}>
          <boxGeometry args={[0.6, 0.4, 0.6]} />
        </mesh>

        {/* Arms and Rotors */}
        {[
          [1, 1], [1, -1], [-1, 1], [-1, -1]
        ].map(([x, z], i) => (
          <group key={i} position={[x * 0.8, 0, z * 0.8]}>
            {/* Arm */}
            <mesh material={armMaterial} position={[-x * 0.4, 0, -z * 0.4]} rotation={[0, Math.atan2(x, z), 0]}>
              <cylinderGeometry args={[0.05, 0.05, 1.2]} />
            </mesh>
            {/* Motor */}
            <mesh material={armMaterial} position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.2]} />
            </mesh>
            {/* Rotor */}
            <mesh 
              ref={(el) => { if (el) rotors.current[i] = el; }} 
              material={rotorMaterial} 
              position={[0, 0.2, 0]}
            >
              <cylinderGeometry args={[0.4, 0.4, 0.01]} />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
}

export function Scene({ activePart = null }: { activePart?: string | null }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00D4FF" />
      <pointLight position={[0, 5, -10]} intensity={0.5} color="#7B2FFF" />
      <DroneModel activePart={activePart} />
    </>
  );
}

"use client";

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface FeatureBadgeProps {
  text: string;
  initialPosition: [number, number, number];
  orbitRadius: number;
  orbitSpeed: number;
  color?: string;
  textColor?: string;
}

const FeatureBadge: React.FC<FeatureBadgeProps> = ({
  text,
  initialPosition,
  orbitRadius,
  orbitSpeed,
  color = '#3333DD', // Default badge color (a blue)
  textColor = '#FFFFFF', // Default text color
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const textRef = useRef<any>(null!); // THREE.Mesh or similar for Text

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const angle = clock.getElapsedTime() * orbitSpeed + initialPosition[0]; // Use initial X as phase offset
      groupRef.current.position.x = Math.cos(angle) * orbitRadius;
      groupRef.current.position.z = Math.sin(angle) * orbitRadius;
      groupRef.current.position.y = initialPosition[1] + Math.sin(clock.getElapsedTime() * orbitSpeed * 0.7) * 2; // Gentle bobbing

      // Make the badge always face the camera
      // This is a simple billboard effect; for more complex scenes, lookAt might need a target
      if (groupRef.current.parent) { // Ensure parent (camera) exists
        const camera = groupRef.current.parent.getObjectByProperty('isPerspectiveCamera', true) as THREE.PerspectiveCamera;
        if (camera) {
          groupRef.current.lookAt(camera.position);
        }
      }
    }
  });

  return (
    <group ref={groupRef} position={initialPosition}>
      <RoundedBox args={[5, 2, 0.3]} radius={0.2} smoothness={4}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} roughness={0.4} />
      </RoundedBox>
      <Text
        ref={textRef}
        position={[0, 0, 0.2]} // Slightly in front of the box
        fontSize={0.5}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        maxWidth={4.5}
        textAlign="center"
      >
        {text}
      </Text>
    </group>
  );
};

export default FeatureBadge;


import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import * as THREE from 'three';

// Type definitions for our components
interface FloatingCubeProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
}

interface FloatingSphereProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}

// Create a floating cube with manual animation
const FloatingCube = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = "#ffffff" }: FloatingCubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  
  // Use useFrame for animation instead of react-spring
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Simple floating animation using sine
      meshRef.current.position.y = initialY + Math.sin(clock.getElapsedTime()) * 0.2;
      // Gentle rotation
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh 
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
    </mesh>
  );
};

// Create a floating sphere with manual animation
const FloatingSphere = ({ position = [0, 0, 0], scale = 1, color = "#ffffff" }: FloatingSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  
  // Use useFrame for animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Offset the sine wave slightly for spheres to create varied movement
      meshRef.current.position.y = initialY + Math.sin(clock.getElapsedTime() + 1) * 0.2;
      // Gentle rotation
      meshRef.current.rotation.z += 0.001;
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh 
      ref={meshRef}
      position={position}
      scale={scale}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
    </mesh>
  );
};

interface SceneContentProps {
  scrollProgress?: number;
}

const SceneContent = ({ scrollProgress = 0 }: SceneContentProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Rotate the entire scene based on scroll progress
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#8860ff" intensity={0.5} />
      
      <group ref={groupRef}>
        <FloatingCube position={[3, 0, 0]} color="#8860ff" />
        <FloatingSphere position={[-3, 1, 2]} scale={0.75} color="#ffffff" />
        <FloatingCube position={[0, -2, 1]} rotation={[Math.PI / 4, 0, Math.PI / 4]} color="#ffffff" scale={0.5} />
        <FloatingSphere position={[2, 2, -2]} scale={0.6} color="#8860ff" />
      </group>

      <Stars radius={50} depth={50} count={500} factor={4} fade />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <Environment preset="night" />
    </>
  );
};

interface Scene3DProps {
  scrollProgress?: number;
  className?: string;
}

const Scene3D = ({ scrollProgress = 0, className }: Scene3DProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  
  return (
    <div ref={ref} className={cn("w-full h-full", className)}>
      {isInView && (
        <Canvas 
          frameloop="always" 
          dpr={[1, 1.5]} 
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: 'default'
          }}
          style={{
            background: 'transparent'
          }}
        >
          <Suspense fallback={null}>
            <SceneContent scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default Scene3D;

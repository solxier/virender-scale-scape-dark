
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { OrbitControls, PerspectiveCamera, Environment, Stars } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import * as THREE from 'three';
import { SpringValue } from "@react-spring/core";

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

// Define proper spring animation values
interface AnimatedValues {
  positionY: SpringValue<number>;
}

// Create a simple primitive that won't cause errors
const FloatingCube = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = "#ffffff" }: FloatingCubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Fix the spring animation using to-object notation
  const { positionY } = useSpring<AnimatedValues>({
    loop: { reverse: true },
    from: { positionY: position[1] - 0.2 },
    to: { positionY: position[1] + 0.2 },
    config: {
      mass: 1,
      tension: 50,
      friction: 10,
    },
  });

  return (
    <animated.mesh 
      ref={meshRef}
      // Use individual position and rotation props to avoid object spreading issues
      position-x={position[0]}
      position-y={positionY}
      position-z={position[2]}
      rotation-x={rotation[0]}
      rotation-y={rotation[1]}
      rotation-z={rotation[2]}
      scale={scale}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
    </animated.mesh>
  );
};

const FloatingSphere = ({ position = [0, 0, 0], scale = 1, color = "#ffffff" }: FloatingSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Fix the animation setup
  const { positionY } = useSpring<AnimatedValues>({
    loop: { reverse: true },
    from: { positionY: position[1] - 0.2 },
    to: { positionY: position[1] + 0.2 },
    config: {
      mass: 1,
      tension: 40,
      friction: 10,
    },
  });

  return (
    <animated.mesh 
      ref={meshRef}
      // Use individual position props instead of array to avoid spread issues
      position-x={position[0]}
      position-y={positionY}
      position-z={position[2]}
      scale={scale}
    >
      <sphereGeometry args={[1, 8, 8]} /> {/* Reduced geometry complexity for better performance */}
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
    </animated.mesh>
  );
};

interface SceneContentProps {
  scrollProgress?: number;
}

const SceneContent = ({ scrollProgress = 0 }: SceneContentProps) => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#8860ff" intensity={0.5} />
      
      <group rotation-y={scrollProgress * Math.PI * 2}>
        <FloatingCube position={[3, 0, 0]} color="#8860ff" />
        <FloatingSphere position={[-3, 1, 2]} scale={0.75} color="#ffffff" />
        <FloatingCube position={[0, -2, 1]} rotation={[Math.PI / 4, 0, Math.PI / 4]} color="#ffffff" scale={0.5} />
        <FloatingSphere position={[2, 2, -2]} scale={0.6} color="#8860ff" />
      </group>

      <Stars radius={50} depth={50} count={150} factor={4} fade />
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
          frameloop="demand" 
          dpr={[1, 1.5]} 
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            depth: true,
            stencil: false,
            // Remove any problematic Three.js features
            localClippingEnabled: false,
          }}
          style={{
            background: 'transparent'
          }}
          camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
            position: [0, 0, 10]
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

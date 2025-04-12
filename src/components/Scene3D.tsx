
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { OrbitControls, PerspectiveCamera, Environment, Stars } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import * as THREE from 'three';

// Create a simple primitive that won't cause errors
const FloatingCube = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = "#ffffff" }) => {
  const meshRef = useRef(null);
  
  // Use separate values instead of array for spring animation
  const { y } = useSpring({
    loop: { reverse: true },
    from: { y: position[1] - 0.2 },
    to: { y: position[1] + 0.2 },
    config: {
      mass: 1,
      tension: 50,
      friction: 10,
    },
  });

  return (
    <animated.mesh 
      ref={meshRef}
      position-x={position[0]}
      position-y={y}
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

const FloatingSphere = ({ position = [0, 0, 0], scale = 1, color = "#ffffff" }) => {
  const meshRef = useRef(null);
  
  // Use separate values instead of array
  const { y } = useSpring({
    loop: { reverse: true },
    from: { y: position[1] - 0.2 },
    to: { y: position[1] + 0.2 },
    config: {
      mass: 1,
      tension: 40,
      friction: 10,
    },
  });

  return (
    <animated.mesh 
      ref={meshRef}
      position-x={position[0]}
      position-y={y}
      position-z={position[2]}
      scale={scale}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
    </animated.mesh>
  );
};

const SceneContent = ({ scrollProgress = 0 }) => {
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
          frameloop="demand" 
          dpr={[1, 2]}
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
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <SceneContent scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default Scene3D;

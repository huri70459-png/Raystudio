import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

function NeuralNexus() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#5c7cfa') },
      uColor2: { value: new THREE.Color('#9775fa') },
      uColor3: { value: new THREE.Color('#f783ac') },
    },
    vertexShader: `
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;
      uniform float uTime;
      
      void main() {
        vPosition = position;
        vNormal = normal;
        vUv = uv;
        
        vec3 pos = position;
        float distortion = sin(pos.x * 3.0 + uTime) * 0.1 + 
                          cos(pos.y * 2.0 + uTime * 0.7) * 0.1 +
                          sin(pos.z * 4.0 + uTime * 0.5) * 0.05;
        pos += normal * distortion;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      
      void main() {
        float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
        
        vec3 color = mix(uColor1, uColor2, sin(vUv.x * 3.14 + uTime * 0.5) * 0.5 + 0.5);
        color = mix(color, uColor3, cos(vUv.y * 3.14 + uTime * 0.3) * 0.5 + 0.5);
        
        float alpha = 0.3 + fresnel * 0.7;
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 4]} />
      <shaderMaterial
        ref={materialRef}
        args={[shader]}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function OrbitingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.2;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#748ffc"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function InnerGlow() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Sphere ref={ref} args={[1.2, 32, 32]}>
      <MeshDistortMaterial
        color="#4c6ef5"
        transparent
        opacity={0.15}
        distort={0.4}
        speed={2}
      />
    </Sphere>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#5c7cfa" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#9775fa" />
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <NeuralNexus />
      </Float>
      
      <InnerGlow />
      <OrbitingParticles />
      
      <Stars
        radius={50}
        depth={50}
        count={1000}
        factor={3}
        saturation={0}
        fade
        speed={1}
      />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

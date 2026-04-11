import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DNAHelix = () => {
  const groupRef = useRef<THREE.Group>(null);
  const count = 40;

  const { positions1, positions2, connections } = useMemo(() => {
    const p1: [number, number, number][] = [];
    const p2: [number, number, number][] = [];
    const conn: { start: [number, number, number]; end: [number, number, number] }[] = [];

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4;
      const y = (i / count) * 8 - 4;
      const x1 = Math.cos(t) * 1.5;
      const z1 = Math.sin(t) * 1.5;
      const x2 = Math.cos(t + Math.PI) * 1.5;
      const z2 = Math.sin(t + Math.PI) * 1.5;
      p1.push([x1, y, z1]);
      p2.push([x2, y, z2]);
      if (i % 3 === 0) conn.push({ start: [x1, y, z1], end: [x2, y, z2] });
    }
    return { positions1: p1, positions2: p2, connections: conn };
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={groupRef}>
      {positions1.map((pos, i) => (
        <mesh key={`a${i}`} position={pos}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {positions2.map((pos, i) => (
        <mesh key={`b${i}`} position={pos}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {connections.map((c, i) => {
        const start = new THREE.Vector3(...c.start);
        const end = new THREE.Vector3(...c.end);
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const dir = end.clone().sub(start);
        const len = dir.length();
        return (
          <mesh key={`c${i}`} position={mid}>
            <cylinderGeometry args={[0.03, 0.03, len, 8]} />
            <meshStandardMaterial color="#94a3b8" opacity={0.5} transparent />
            <primitive object={new THREE.Object3D()} ref={(obj: THREE.Object3D | null) => {
              if (obj?.parent) {
                obj.parent.lookAt(end);
                obj.parent.rotateX(Math.PI / 2);
              }
            }} />
          </mesh>
        );
      })}
    </group>
  );
};

export default DNAHelix;

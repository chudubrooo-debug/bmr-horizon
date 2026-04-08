import { Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const DNAHelix = lazy(() => import("./DNAHelix"));
const FloatingParticles = lazy(() => import("./FloatingParticles"));

interface Props {
  showDNA?: boolean;
  showParticles?: boolean;
  className?: string;
  interactive?: boolean;
}

const Scene3D = ({ showDNA = true, showParticles = true, className = "", interactive = false }: Props) => {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#06b6d4" />
        <Suspense fallback={null}>
          {showDNA && <DNAHelix />}
          {showParticles && <FloatingParticles count={30} />}
        </Suspense>
        {interactive && <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />}
      </Canvas>
    </div>
  );
};

export default Scene3D;

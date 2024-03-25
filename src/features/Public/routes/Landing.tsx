import * as THREE from "three";
import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import {
  Reflector,
  CameraShake,
  OrbitControls,
  useTexture,
  Text,
} from "@react-three/drei";
import { KernelSize } from "postprocessing";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { degToRad } from "three/src/math/MathUtils.js";
import poppin from "@/assets/fonts/Poppins-Black.ttf";
import var1 from "@/assets/SurfaceImperfections003_1K_var1.jpg";
import normalTex from "@/assets/SurfaceImperfections003_1K_Normal.jpg";

const Rig = ({ children }: any) => {
  const ref = useRef<THREE.Group>();
  const vec = new THREE.Vector3();
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, 0, 3.5), 0.05);
    ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1);
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      (-mouse.x * Math.PI) / 20,
      0.1
    );
  });
  return <group ref={ref}>{children}</group>;
};

const Ground = (props: JSX.IntrinsicElements["Reflector"]) => {
  const [floor, normal] = useTexture([var1, normalTex]);
  return (
    <Reflector resolution={1024} args={[8, 8]} {...props}>
      {(Material, props) => (
        <Material
          color="#f0f0f0"
          metalness={0}
          roughnessMap={floor}
          normalMap={normal}
          normalScale={[2, 2]}
          {...props}
        />
      )}
    </Reflector>
  );
};

export const Landing = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    setFadeIn(true);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        dpr={[0.7, 1.5]}
        camera={{ position: [1.5, 1.7, 15] }}
      >
        <color attach="background" args={["black"]} />
        <ambientLight />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
        <Suspense fallback={null}>
          <Rig>
            <Text
              font={poppin}
              position={[0, -0.4, fadeIn ? 0 : -5]} // Start position behind the background
              lineHeight={0.6}
              textAlign="center"
              rotation-y={degToRad(30)}
              anchorY={"bottom"}
              color="red"
              opacity={fadeIn ? 1 : 0} // Start with opacity 0 and gradually increase to 1
            >
              SH3KHU
            </Text>
            <Ground
              mirror={1}
              blur={[500, 100]}
              mixBlur={12}
              mixStrength={1.5}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              position-y={-0.8}
            />
          </Rig>
          <EffectComposer multisampling={8}>
            <Bloom
              kernelSize={3}
              luminanceThreshold={0}
              luminanceSmoothing={0.4}
              intensity={0.6}
            />
            <Bloom
              kernelSize={KernelSize.HUGE}
              luminanceThreshold={0}
              luminanceSmoothing={0}
              intensity={0.5}
            />
          </EffectComposer>
        </Suspense>
        <CameraShake
          yawFrequency={0.2}
          pitchFrequency={0.2}
          rollFrequency={0.2}
        />
      </Canvas>
    </div>
  );
};

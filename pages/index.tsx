import Image from "next/image";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";
import { Canvas, MeshProps, useFrame, useThree } from "@react-three/fiber";
import { MouseEvent, Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import DatsunModel from "../components/DatsunModel";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

interface GenericBox extends MeshProps {
  color: string;
}

const Box = (props: GenericBox) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    mesh.current.rotation.x = Math.cos(state.clock.getElapsedTime());
    mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime());
    // mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [2, 2, 2] : [1, 1, 1]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={hovered ? "hotpink" : props.color} />
    </mesh>
  );
};

export default function Home() {
  const [state, setState] = useState({
    box1Color: "#000000",
    box2Color: "#000000",
  });

  useEffect(() => {
    const guiInit = async () => {
      const { GUI } = await import("dat.gui");
      const gui = new GUI();
      gui.addColor(state, "box1Color").onChange((val) => {
        setState({ ...state, box1Color: val });
      });
      gui.addColor(state, "box2Color").onChange((val) => {
        setState({ ...state, box2Color: val });
      });
    };

    guiInit();
  }, []);

  const handleUpdate = () => {};

  return (
    <>
      <div className={styles.container}>
        <Layout>
          <main className={styles.main}>
            <div id="canvas-container" className="w-screen h-screen">
              <Canvas>
                {/* <Suspense fallback={null}>
                <ambientLight intensity={0.1} />
                <pointLight position={[10, 10, 10]} />
                <DatsunModel />
                <OrbitControls />
              </Suspense> */}
                <axesHelper args={[4]} />
                <group scale={1}>
                  <Box position={[-1.5, 0, 0]} color={state.box1Color} />
                  <Box position={[1.5, 0, 0]} color={state.box2Color} />
                </group>
              </Canvas>
            </div>
          </main>
        </Layout>
      </div>
    </>
  );
}

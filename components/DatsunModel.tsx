import { useFrame, useLoader } from "@react-three/fiber";
import { Box3, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const DatsunModel = () => {
  const gltf = useLoader(GLTFLoader, "/models/240z.glb");

  // const box = new Box3().setFromObject(gltf.scene);
  // const center = box.getCenter(new Vector3());

  // console.log(center);
  // gltf.scene.position.x += gltf.scene.position.x - center.x;
  // gltf.scene.position.y += gltf.scene.position.y - center.y;
  // gltf.scene.position.z += gltf.scene.position.z - center.z;

  useFrame((state, delta) => {
    gltf.scene.rotation.y += 0.002;
  });

  return (
    <>
      <primitive object={gltf.scene} scale={1} />
    </>
  );
};

export default DatsunModel;

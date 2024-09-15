import React, { useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Model({ url, onError }) {
  const [gltf, setGltf] = React.useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => setGltf(gltf),
      undefined,
      (error) => {
        console.error('Error loading model:', error);
        onError(error);
      }
    );
  }, [url, onError]);

  if (!gltf) return null;
  return <primitive object={gltf.scene} />;
}

export default Model;
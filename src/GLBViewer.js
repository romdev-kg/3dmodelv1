// src/components/GLBViewer.js
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
  // Используем useGLTF для загрузки модели
  const { scene } = useGLTF('/model.glb');
  return <primitive object={scene} scale={1.5} />;
}

const GLBViewer = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100vw' }}>
      {/* Добавляем свет */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Загружаем модель с помощью Suspense для асинхронной загрузки */}
      <Suspense fallback={null}>
        <Model />
      </Suspense>

      {/* Управление камерой */}
      <OrbitControls />
    </Canvas>
  );
};

export default GLBViewer;

import React from "react";
import "./App.css";
import Hero from "./Hero";
import Features from "./Features";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GLBViewer from './GLBViewer';
import Generate3DModel from "./Generate3DModel";
import ProductDetail from "./components/example";
import { About } from "./components/About";
import { Contact } from "./components/contact";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/example" element={<ProductDetail />} />
        <Route path="/3d-viewer" element={<GLBViewer />} />
        <Route path="/3d-generate" element={<Generate3DModel/>}/>
        <Route path="#features" element={<About />} />
        <Route path="#contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;

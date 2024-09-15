import React from "react";
import { About } from "./components/About";

function Features() {
  return (
    <>
    <section id="aboutus">
      <div className="container">
        <h2>Features</h2>
        <div className="features">
          <div className="feature">
            <i className="fas fa-cube"></i>
            <h3>3D Product Models</h3>
            <p>Let your customers view products from all angles.</p>
          </div>
          <div className="feature">
            <i className="fas fa-arrows-alt"></i>
            <h3>Virtual Reality</h3>
            <p>Integrate with VR for an immersive shopping experience.</p>
          </div>
          <div className="feature">
            <i className="fas fa-chart-line"></i>
            <h3>Sales Analytics</h3>
            <p>Detailed statistics and data analysis for every product.</p>
          </div>
        </div>
      </div>
    </section>
    <About/>
    </>
  );
}

export default Features;

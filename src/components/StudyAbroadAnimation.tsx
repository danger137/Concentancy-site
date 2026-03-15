'use client';

import React from 'react';

export default function StudyAbroadAnimation() {
    return (
        <div className="study-animation-wrapper">
            <style dangerouslySetInnerHTML={{
                __html: `
        .study-animation-wrapper {
          position: relative;
          width: 100%;
          max-width: 500px;
          aspect-ratio: 1;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: radial-gradient(circle, rgba(255,119,0,0.1) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
        }

        .animated-globe {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: #4facfe;
          background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
          box-shadow: inset -20px -20px 40px rgba(0,0,0,0.2), 0 10px 30px rgba(0,0,0,0.2);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: floatGlobe 4s ease-in-out infinite;
        }

        .globe-meridians {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
        }
        
        .globe-meridians:nth-child(2) { transform: scaleX(0.5); }
        .globe-meridians:nth-child(3) { transform: scaleY(0.5); }

        .orbit-path {
          position: absolute;
          width: 320px;
          height: 320px;
          border: 2px dashed rgba(255, 119, 0, 0.4);
          border-radius: 50%;
          animation: rotateOrbit 10s linear infinite;
        }

        .orbit-plane {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2.5rem;
          color: #FF7700;
          filter: drop-shadow(0 5px 5px rgba(255,119,0,0.4));
          animation: tiltPlane 10s linear infinite;
        }

        .orbit-path-2 {
          position: absolute;
          width: 420px;
          height: 420px;
          border: 2px dotted rgba(76, 175, 80, 0.4);
          border-radius: 50%;
          animation: rotateOrbit 15s linear infinite reverse;
        }
        
        .floating-cap {
          position: absolute;
          bottom: -15px;
          right: 20%;
          font-size: 2.5rem;
          color: #4CAF50;
          animation: bounceCap 3s ease-in-out infinite alternate;
        }

        .floating-book {
          position: absolute;
          top: 10%;
          left: 15%;
          font-size: 2rem;
          animation: floatBook 5s ease-in-out infinite alternate;
        }
        
        .floating-diploma {
          position: absolute;
          bottom: 20%;
          left: 5%;
          font-size: 2rem;
          animation: floatBook 4s ease-in-out infinite alternate-reverse;
        }

        @keyframes floatGlobe {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes rotateOrbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes tiltPlane {
          0% { transform: translateX(-50%) rotate(90deg); }
          100% { transform: translateX(-50%) rotate(90deg); }
        }

        @keyframes bounceCap {
          0% { transform: translateY(0) rotate(-10deg); }
          100% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes floatBook {
          0% { transform: translateY(0) rotate(5deg) scale(1); }
          100% { transform: translateY(-15px) rotate(-15deg) scale(1.1); }
        }
      `}} />

            <div className="orbit-path-2">
                <div className="floating-cap"><i className="fa fa-graduation-cap"></i></div>
                <div className="floating-diploma"><i className="fa fa-certificate text-warning"></i></div>
            </div>

            <div className="orbit-path">
                <div className="orbit-plane">
                    <i className="fa fa-plane"></i>
                </div>
                <div className="floating-book"><i className="fa fa-book text-info"></i></div>
            </div>

            <div className="animated-globe">
                <div className="globe-meridians"></div>
                <div className="globe-meridians"></div>
                <div className="globe-meridians"></div>
                <div style={{ position: 'absolute', zIndex: 10 }} className="text-white text-center">
                    <i className="fa fa-globe" style={{ fontSize: '4rem', opacity: 0.8 }}></i>
                </div>
            </div>
        </div>
    );
}

//@ts-nocheck
import React, { useState, useEffect } from 'react';

const StepCounter = () => {
  const [steps, setSteps] = useState(0);
  const [motionData, setMotionData] = useState({ x: 0, y: 0, z: 0 });
  const [previousAcceleration, setPreviousAcceleration] = useState({ x: 0, y: 0, z: 0 });

  const handleMotionEvent = event => {
    const { x, y, z } = event.accelerationIncludingGravity;
    setMotionData({ x, y, z });

    const deltaX = Math.abs(previousAcceleration.x - x);
    const deltaY = Math.abs(previousAcceleration.y - y);
    const deltaZ = Math.abs(previousAcceleration.z - z);

    const threshold = 1.5; // Adjust this value to your needs
    if (deltaX > threshold || deltaY > threshold || deltaZ > threshold) {
      setSteps(prevSteps => prevSteps + 1);
    }

    setPreviousAcceleration({ x, y, z });
  };

  useEffect(() => {
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotionEvent);
    }

    return () => {
      window.removeEventListener('devicemotion', handleMotionEvent);
    };
  }, [previousAcceleration]);

  return (
    <div>
      <h1>Step Counter</h1>
      <p>Steps: {steps}</p>
      <p>Acceleration: {`x: ${motionData.x}, y: ${motionData.y}, z: ${motionData.z}`}</p>
    </div>
  );
};

export default StepCounter;

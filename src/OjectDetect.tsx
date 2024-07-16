// @ts-nocheck
import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import './App.css'; // Подключение файла стилей

const ObjectDetection = () => {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    // Загрузка модели COCO-SSD
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  useEffect(() => {
    // Обработка видео и отображение результатов
    const detectFrame = async () => {
      if (webcamRef.current && webcamRef.current.video.readyState === 4 && model) {
        const video = webcamRef.current.video;
        const predictions = await model.detect(video);
        setPredictions(predictions);

        requestAnimationFrame(detectFrame);
      }
    };

    if (model) {
      detectFrame();
    }
  }, [model]);

  console.log(predictions);

  return (
    <div className="container">
      <div className="video-container">
        <Webcam
          ref={webcamRef}
          audio={false}
          style={{ width: '400px', height: '320px' }}
          videoConstraints={{
            facingMode: { exact: "environment" }
          }}
        />
        {predictions.map((prediction, index) => {
          const [x, y, width, height] = prediction.bbox;
          return (
            <div
              key={index}
              className="prediction-box"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                width: `${width}px`,
                height: `${height}px`,
              }}
            >
              <span className="prediction-text">{prediction.class}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ObjectDetection;

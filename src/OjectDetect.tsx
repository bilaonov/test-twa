//@ts-nocheck
import React, { useRef, useEffect, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import './App.css'; // Подключение файла стилей

const ObjectDetection = () => {
  const videoRef = useRef(null);
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
    // Запуск камеры
    const startVideo = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    };

    startVideo();
  }, [videoRef]);

  useEffect(() => {
    // Обработка видео и отображение результатов
    const detectFrame = async () => {
      if (videoRef.current && model) {
        const predictions = await model.detect(videoRef.current);
        setPredictions(predictions);

        requestAnimationFrame(detectFrame);
      }
    };

    detectFrame();
  }, [model]);

  console.log(predictions);

  return (
    <div className="container">
      {predictions.map(item => (
        <div>{item.class}</div>
      ))}
      <div className="video-container">
        <video ref={videoRef} style={{ width: '400px', height: '320px' }} autoPlay />
      </div>
    </div>
  );
};

export default ObjectDetection;

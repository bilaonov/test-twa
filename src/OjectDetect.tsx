//@ts-nocheck
import React, { useRef, useEffect, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const ObjectDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);

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
        drawPredictions(predictions);

        requestAnimationFrame(detectFrame);
      }
    };

    detectFrame();
  }, [model]);

  const drawPredictions = predictions => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    predictions.forEach(prediction => {
      const [x, y, width, height] = prediction.bbox;
      ctx.strokeStyle = '#00FFFF';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      
      ctx.font = '18px Arial';
      ctx.fillStyle = '#00FFFF';
      ctx.fillText(prediction.class, x, y > 10 ? y - 5 : 10);
    });
  };

  return (
    <div className="container">
      <div className="video-container">
        <video
          ref={videoRef}
          style={{ width: '640px', height: '480px' }}
          autoPlay
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
        />
      </div>
    </div>
  );
};

export default ObjectDetection;

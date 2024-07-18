import { useRef, useEffect, useState, FC } from 'react';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

interface IObjectDetectionProps {
  detectName: string;
  onDetect: any;
}

const ObjectDetection: FC<IObjectDetectionProps> = ({ detectName, onDetect }) => {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    // Загрузка модели COCO-SSD
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      //@ts-ignore
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  useEffect(() => {
    // Обработка видео и отображение результатов
    const detectFrame = async () => {
      //@ts-ignore
      if (webcamRef.current && webcamRef.current.video.readyState === 4 && model) {
        //@ts-ignore
        const video = webcamRef.current.video;
        //@ts-ignore
        const predictions = await model.detect(video);
        setPredictions(predictions);
        //@ts-ignore
        const detected = predictions.some(prediction => prediction.class === detectName);
        if (detected) {
          onDetect();
        } else {
          requestAnimationFrame(detectFrame);
        }
      }
    };

    if (model) {
      detectFrame();
    }
  }, [model, detectName, onDetect]);

  return (
    <div className="full-screen-container">
      <div className="video-container">
        <Webcam
          ref={webcamRef}
          audio={false}
          className="full-screen-video"
          videoConstraints={{
            facingMode: 'environment',
          }}
        />

        {predictions.map((prediction, index) => {
          //@ts-ignore
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
              {/*@ts-ignore */}
              <span className="prediction-text">{prediction.class}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ObjectDetection;

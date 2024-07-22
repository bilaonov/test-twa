//@ts-nocheck
import { useTranslation } from 'react-i18next';
import styles from './Main.module.scss';
import { Typography } from '../../UI/Typography/Typography';
import { useEffect, useState } from 'react';
import ObjectDetection from '../../../OjectDetect';
import { createClient } from '@supabase/supabase-js';

export const Main = () => {
  const supabase = createClient(
    'https://frxgcdvznolnxlfbogir.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyeGdjZHZ6bm9sbnhsZmJvZ2lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyMDIwMDcsImV4cCI6MjAzNjc3ODAwN30.7EZnKwEIR36v7s0jsCA3THfFguH6g4_QLLKC9p9UTa8',
  );

  const [userData, setUserData] = useState<Telegram.WebApp.User | null>(null);

  useEffect(() => {
    // Ensure Telegram WebApp SDK is available
    if (window.Telegram?.WebApp) {
      const telegramWebApp = window.Telegram.WebApp;
      telegramWebApp.ready();

      // Get user data
      const user = telegramWebApp.initDataUnsafe.user;
      setUserData(user);

      // Additional setup if needed
      telegramWebApp.expand();
    }
  }, []);

  console.log(userData)


  const [countries, setCountries] = useState<any>([]);
  const [detectName, setDetectName] = useState('');

  async function getCountries() {
    const { data } = await supabase
      .from('find-models-list')
      .select('*')
      .in('name', ['car', 'mouse', 'hair drier'])
      .limit(3);
    setCountries(data);
  }

  useEffect(() => {
    getCountries();
  }, []);

  const { t } = useTranslation();

  const [showCamera, setShowCamera] = useState(false);

  const handleCameraToggle = (detectName: string) => {
    setShowCamera((prev: any) => !prev);
    setDetectName(detectName);
  };

  const handleDetection = () => {
    // setDetectedItem(itemName);
    setShowCamera(false);
  };

  console.log(detectName);

  return (
    <div className={styles['container']}>
      <div className={styles['items']}>
        <Typography fontFamily="nerko-one" variant="Text24Bold">
          {t('main.todayChallenge')}
        </Typography>
        <div className={styles['find-box']}>
        {userData?.firstName || 'text'}
          <div className={styles['find-items']}>
            <Typography fontFamily="nerko-one" variant="Text24Bold">
              {t('main.findText')}
            </Typography>
            <div className={styles['find-card']}>
              {countries.map((item: any) => (
                <div className={styles['card-items']}>
                  <Typography className={styles['item-text']} fontFamily="nerko-one" variant="Text18Bold">
                    {item.name}
                  </Typography>
                  <img src={item.img_url} alt="" width={80} height={80} />
                  <Typography className={styles['reward']} fontFamily="nerko-one" variant="Text18Bold">
                    + {item.reward.toLocaleString()}
                  </Typography>
                  <input className={styles['checkbox']} type="checkbox" checked={item.find} />
                  <button className={styles['button']} onClick={() => handleCameraToggle(item.detect_name)}>
                    <Typography fontFamily="nerko-one" variant="Text24Bold">
                      find
                    </Typography>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showCamera && <ObjectDetection detectName={detectName} onDetect={handleDetection} />}
    </div>
  );
};

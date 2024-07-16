import { useTranslation } from 'react-i18next';
import styles from './Main.module.scss';
import { Typography } from '../../UI/Typography/Typography';
import { useState } from 'react';
import ObjectDetection from '../../../OjectDetect';

const challengesTodayMap = [
  {
    name: 'cat',
    url: 'public/images/cat.png',
    reward: 2000,
    find: true,
  },
  {
    name: 'dog',
    url: 'public/images/cat.png',
    reward: 3000,
    find: false,
  },
  {
    name: 'bird',
    url: 'public/images/cat.png',
    reward: 5000,
    find: false,
  },
];

export const Main = () => {
  const { t } = useTranslation();

  const [showCamera, setShowCamera] = useState(false);

  const handleCameraToggle = () => {
    setShowCamera((prev: any) => !prev);
  };

  console.log(showCamera);

  return (
    <div className={styles['container']}>
      <div className={styles['items']}>
        <Typography fontFamily="nerko-one" variant="Text24Bold">
          {t('main.todayChallenge')}
        </Typography>
        <div className={styles['find-box']}>
          <div className={styles['find-items']}>
            <Typography fontFamily="nerko-one" variant="Text24Bold">
              {t('main.findText')}
            </Typography>
            <div className={styles['find-card']}>
              {challengesTodayMap.map(item => (
                <div className={styles['card-items']}>
                  <Typography className={styles['item-text']} fontFamily="nerko-one" variant="Text18Bold">
                    {item.name}
                  </Typography>
                  <img src={item.url} alt="" width={80} height={80} />
                  <Typography className={styles['reward']} fontFamily="nerko-one" variant="Text18Bold">
                    + {item.reward.toLocaleString()}
                  </Typography>
                  <input className={styles['checkbox']} type="checkbox" checked={item.find} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className={styles['button']} onClick={handleCameraToggle}>
          <Typography fontFamily="nerko-one" variant="Text24Bold">
            GO SEARCH
          </Typography>{' '}
        </button>
      </div>
      {showCamera && <ObjectDetection />}
    </div>
  );
};

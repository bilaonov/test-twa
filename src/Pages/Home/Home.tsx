import { Footer } from '../../Components/Core/Footer/Footer';
import { Header } from '../../Components/Core/Header/Header';
import { Main } from '../../Components/Core/Main/Main';
import styles from './Home.module.scss';

export const Home = () => {
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <Header />
        <div className={styles['main-content']}>
          <Main />
        </div>
      </div>
      <Footer />
    </div>
  );
};

import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.Home}>
      <img
        src='/images/main.png'
        alt='메인 이미지'
        className={styles.mainImage}
      />
    </div>
  );
}

export default Home;

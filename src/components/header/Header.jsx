import { Link } from 'react-router-dom';

import styles from './Header.module.css';

export default function Header() {
  return (
    <>
      <header className={styles.Header}>
        <nav className={styles.header__nav}>
          <div className={styles.nav__left}>
            <Link to='/' className={styles.site__name}>
              Dev Community
            </Link>
          </div>

          <div className={styles.nav__right} id='nav__menu'>
            <Link className={styles.nav__item} to='/'>
              홈
            </Link>
            <Link className={styles.nav__item} to='/login'>
              로그인
            </Link>
            <Link className={styles.nav__item} to='/register'>
              회원가입
            </Link>
          </div>
          {/* <div class='nav__toggle' id='nav-toggle'>
            <i class='fa-solid fa-bars'></i>
          </div> */}
        </nav>
      </header>
    </>
  );
}

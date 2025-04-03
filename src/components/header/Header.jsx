import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import styles from './Header.module.css';

export default function Header() {
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // 로그아웃
  const handleLogout = async () => {
    try {
      localStorage.removeItem('token') || sessionStorage.removeItem('token');

      setIsLoggedIn(false);
      setUser(null);

      alert('로그아웃 되었습니다.');
      navigate('/login');
    } catch (err) {
      alert('로그아웃 실패');
    }
  };

  return (
    <>
      <header className={styles.Header}>
        <div className={styles.container}>
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

              {!isLoggedIn ? (
                <>
                  <Link className={styles.nav__item} to='/login'>
                    로그인
                  </Link>
                  <Link className={styles.nav__item} to='/register'>
                    회원가입
                  </Link>
                </>
              ) : (
                <>
                  <Link className={styles.nav__item} to='/mypage'>
                    {' '}
                    {user?.name}님 어서오세요!
                  </Link>
                  <button className={styles.nav__item} onClick={handleLogout}>
                    로그아웃
                  </button>
                </>
              )}
            </div>
            {/* <div class='nav__toggle' id='nav-toggle'>
            <i class='fa-solid fa-bars'></i>
          </div> */}
          </nav>
        </div>
      </header>
    </>
  );
}

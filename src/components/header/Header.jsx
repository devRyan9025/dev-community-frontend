import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import styles from './Header.module.css';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Header() {
  const { isLoggedIn, user, setIsLoggedIn, setUser, imageVersion } =
    useContext(AuthContext);
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
                  <Link className={styles.profile__nav} to='/mypage'>
                    <img
                      alt='프로필이미지'
                      src={
                        user?.profile_image
                          ? `${API_BASE}/uploads/${user.profile_image}?v=${imageVersion}`
                          : '/src/assets/default-profile.png'
                      }
                      className={styles.profile__image}
                    />
                    <span className={styles.profile__name}>{user?.name}님</span>
                  </Link>

                  <Link className={styles.nav__item} to='/'>
                    홈
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

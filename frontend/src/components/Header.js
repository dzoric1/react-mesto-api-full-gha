import headerLogo from '../assets/images/logo.svg'
import { Link, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function Header({ email, onLogOut }) {

  const [isBurgerOpen, setIsBurgerOpen] = useState(false)

  function handleBurger() {
    setIsBurgerOpen((isBurgerOpen) => !isBurgerOpen)
  }

  return (
    <header className={`header ${isBurgerOpen ? 'header_open' : ''}`}>
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <Routes>
        <Route
          path='/'
          element={(
            <>
              <div className='header__profile-info'>
                <p className='header__email'>{email}</p>
                <Link
                  className="header__logout-link"
                  to='/sign-in'
                  onClick={onLogOut}
                >
                  Выйти
                </Link>
              </div>
              <button
                className='header__burger'
                onClick={handleBurger}>
                <span
                  className={`header__burger-bar ${isBurgerOpen ? 'header__burger-bar_type_close' : ''}`}>
                </span>
              </button>
            </>
          )}
        />
        <Route
          path='/sign-up'
          element={(
            <Link className='header__link' to='/sign-in'>
              Войти
            </Link>
          )}
        />
        <Route
          path='/sign-in'
          element={(
            <Link className='header__link' to='/sign-up'>
              Регистрация
            </Link>
          )}
        />
      </Routes>

    </header>
  )
}

export default Header;

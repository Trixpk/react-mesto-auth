import { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import logo from '../images/logo.svg';
import MobileMenu from './MobileMenu';

export default function Header({ userData, loggedIn, onSignOut }) {
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

    const handleMenuButtonClick = () => {
        setMobileMenuVisible(!mobileMenuVisible);
    }

    const menuButtonClass = mobileMenuVisible ? 'header__menu-button-active' : 'header__menu-button';

    useEffect(() => {
        setMobileMenuVisible(false);
    }, [loggedIn])
    
    return (
        <>
        <MobileMenu isVisible={mobileMenuVisible} userData={userData} onSignOut={onSignOut} />
        <header className="container header">

            <Link to="/" className="header__logo" target="_self">
                <img className="header__logo-image" src={logo} alt="Mesto" />
            </Link>

            <Switch>
                <Route exact path="/">
                {
                loggedIn &&
                    <div className="header__info">
                        <span className="header__auth header__email">{userData.email}</span>
                        <button className="header__sign-out" onClick={onSignOut}>Выйти</button>
                    </div>
                }

                <button onClick={handleMenuButtonClick} className={menuButtonClass} />
                </Route>
                <Route path="/sign-in">
                    <Link to="/sign-up" className="header__auth">Регистрация</Link>
                </Route>
                <Route path="/sign-up">
                    <Link to="/sign-in" className="header__auth">Войти</Link>
                </Route>
            </Switch>
        </header>
        </>
    );
}
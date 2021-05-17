import { Link, Route, Switch } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Header() {
    return (
        <header className="container header"> 
            <Link to="/" className="header__logo" target="_self">
                <img className="header__logo-image" src={logo} alt="Mesto" />
            </Link>
            <Switch>
                <Route path="/sign-in">
                    <Link to="/sign-up" className="header__auth">Регистрация</Link>
                </Route>
                <Route path="/sign-up">
                    <Link to="/sign-in" className="header__auth">Войти</Link>
                </Route>
            </Switch>
        </header>
    );
}
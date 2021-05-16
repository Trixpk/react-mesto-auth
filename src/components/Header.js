import logo from '../images/logo.svg';

export default function Header() {
    return (
        <header className="container header">
            <a className="header__logo" href="/" target="_self">
                <img className="header__logo-image" src={logo} alt="логотип" />
            </a>
        </header>
    );
}
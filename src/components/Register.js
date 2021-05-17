import { useState } from 'react';
import { Link } from 'react-router-dom';
import InfoToolTip from './InfoToolTip';

export default function Register({ onRegister, isPopupOpen, onClose, registerResult }) {
    const [registerData, setRegisterData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (ev) => {
        const { name, value } = ev.target;
        setRegisterData({
            ...registerData,
            [name]: value
        });
    }


    const handleSubmit = (ev) => {
        ev.preventDefault();

        onRegister(registerData);
           
    }

    return (
        <>
            <form className="sign-up" onSubmit={handleSubmit}>
                <h2 className="sign-up__title">Регистрация</h2>
                <input onChange={handleChange} name="email" type="email" className="sign-up__input" placeholder="Email" value={registerData.email} autoComplete="email" />
                <input onChange={handleChange} name="password" type="password" className="sign-up__input" placeholder="Пароль" value={registerData.password} />

                <button type="submit" className="sign-up__submit">Регистрация</button>
                <p className="sign-up__caption">
                    Уже зарегистрированы?
                    <Link to="/sign-in" className="sign-up__caption-link"> Войти</Link>    
                </p>
            </form>
            <InfoToolTip registerResult={registerResult} onClose={onClose} isPopupOpen={isPopupOpen} />
        </>
    );
}
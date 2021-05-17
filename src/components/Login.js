import { useState } from 'react';

export default function Login({ onLogin }) {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (ev) => {
        const { name, value } = ev.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();

        onLogin(loginData); 
    }

    return (
        <form className="sign-up" onSubmit={handleSubmit}>
            <h2 className="sign-up__title">Вход</h2>
            <input onChange={handleChange} name="email" type="email" className="sign-up__input" placeholder="Email" />
            <input onChange={handleChange} name="password" type="password" className="sign-up__input" placeholder="Пароль" />

            <button type="submit" className="sign-up__submit">Войти</button>
        </form>
    );
}
export default function MobileMenu({ userData, onSignOut, isVisible }) {

    return (
        <>
        {
            isVisible &&
            <div className="header__mobile">
                <span className="header__auth header__email header__email_mobile">{userData.email}</span>
                <button className="header__sign-out" onClick={onSignOut}>Выйти</button>
            </div>
        }
        </>
    );
}
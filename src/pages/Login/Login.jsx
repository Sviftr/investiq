import { useState } from "react";
import "./Login.css";

let Login = () => {
    let [isRegister, setIsRegister] = useState(false);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

let handleRegister = () => {
    if (!email || !password) return alert("Заповніть всі поля");
    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("Реєстрація успішна!");
    setIsRegister(false);
};

let handleLogin = () => {
    let savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) return alert("Користувача не знайдено");
    if (savedUser.email === email && savedUser.password === password) {
        window.location.href = "/dashboard";
    } else {
        alert("Невірний email або пароль!");
    }
};

return (
    <div className="login-wrapper">
        <div className="login-left">
            <h1 className="logo">InvestIQ</h1>
            <p className="subtitle">SMART FINANCE</p>
        </div>

    <div className="login-card">
        <p className="google-txt">Ви можете авторизуватися за допомогою акаунта Google</p>
        <button className="google-btn">
            <div alt="google" className="google-icon"></div> 
            Google
        </button>
        <p className="or">Або увійти за допомогою ел. пошти та паролю після реєстрації</p>

        <div className="form-group">
            <label>Електронна пошта:</label>
            <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>

        <div className="form-group">
            <label>Пароль:</label>
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
        </div>

        {!isRegister ? (
        <>
            <button className="main-btn" onClick={handleLogin}>УВІЙТИ</button>
            <button className="sec-btn" onClick={() => setIsRegister(true)}>
                РЕЄСТРАЦІЯ
            </button>
        </>
        ) : (
        <>
            <button className="main-btn" onClick={handleRegister}>
                ЗАРЕЄСТРУВАТИСЯ
            </button>
            <button className="sec-btn" onClick={() => setIsRegister(false)}>
                НАЗАД
            </button>
        </>
        )}
    </div>
        <div className="whiteblock"></div>
        <div className="group85" alt="group85"></div>
        <div className="group87"  alt="group87"></div>
    </div>
    );
};

export default Login;
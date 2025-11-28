import React from "react";
import "./Login.css";
import { useState } from "react";

let Login = () => {
    let [isRegister, setIsRegister] = useState(false)
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    let handleRegister = () => {
        if(!email || !password){
            alert("Заповніть усі поля!")
            return
        }

        localStorage.setItem("user", JSON.stringify({email, password}))
        alert("Реєстрація пройшла успішно!")
        setIsRegister(false)

    }
}

let handleLogin = () => {
    let savedUser = JSON.parse(localStorage.getItem("user"))
    if(!savedUser){
        return alert("Користувача не знайдено!")
    }
}
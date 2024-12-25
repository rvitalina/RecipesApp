import React, { useState } from 'react'
import axios from 'axios'

export default function InputForm({ setIsOpen }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignUp, setIsSignUp] = useState(false)
    const [error, setError] = useState("")

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        let endpoint = (isSignUp) ? "signUp" : "login"
        await axios.post(`${import.meta.env.VITE_REACT_API_URL}/${endpoint}`, { email, password })
            .then((res) => {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("user", JSON.stringify(res.data.user))
                setIsOpen()
            })
            .catch(data => setError(data.response?.data?.error))
    }

    return (
        <>
            <form className='form' onSubmit={handleOnSubmit}>
                <div className='form-control'>
                    <label>Эл. почта</label>
                    <input type="email" className='input' onChange={(e) => setEmail(e.target.value)} required></input>
                </div>
                <div className='form-control'>
                    <label>Пароль</label>
                    <input type="password" className='input' onChange={(e) => setPassword(e.target.value)} required></input>
                </div>
                <button type='submit'>{(isSignUp) ? "Зарегистрироваться" : "Войти"}</button><br></br>
                {(error != "") && <h6 className='error'>{error}</h6>}<br></br>
                <p onClick={() => setIsSignUp(pre => !pre)}>{(isSignUp) ? "Уже есть аккаунт" : "Создать аккаунт"}</p>
            </form>
        </>
    )
}

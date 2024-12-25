import React, { useEffect, useState } from 'react'
import Modal from './Modal'
// import InputForm from './InputForm'
import { NavLink,useNavigate } from 'react-router-dom'
import InputForm from './InputForm'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  let token = localStorage.getItem("token")
  const [isLogin, setIsLogin] = useState(token ? false : true)
  const navigate = useNavigate();

  let user=JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    setIsLogin(token ? false : true)
  }, [token])

  const checkLogin = () => {
    if(token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true)
      navigate('/');
    }
    setIsOpen(true)
  }

  return (
    <>
      <header>
        <h2>Yummy App</h2>
        <ul>
          <li><NavLink to="/">Главная</NavLink></li>
          <li onClick={() => isLogin && setIsOpen(true)}><NavLink to={!isLogin ? "/myRecipe" : "/"}>Мои рецепты</NavLink></li>
          <li onClick={() => isLogin && setIsOpen(true)}><NavLink to={!isLogin ? "/favRecipe" : "/"}>Любимые</NavLink></li>
          <li><NavLink to={"/review"}>Отзывы</NavLink></li>
          <li><NavLink to={"/tip"}>Советы</NavLink></li>
          <li onClick={() => isLogin && setIsOpen(true)}><NavLink to={!isLogin ? "/personalData" : "/"}>Личный кабинет</NavLink></li>
          
          <li onClick={checkLogin}>
            <p className="login">{ (isLogin) ? "Вход" : "Выход "}</p>
          </li>
        </ul>
      </header>
      {(isOpen) && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} /></Modal>}
    </>
  )
}

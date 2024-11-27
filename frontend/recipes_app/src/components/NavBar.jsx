import React, { useEffect, useState } from 'react'
// import Modal from './Modal'
// import InputForm from './InputForm'
import { NavLink } from 'react-router-dom'

export default function Navbar() {

  return (
    <>
        <header>
            <h2>Yummy App</h2>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink>My Recipe</NavLink></li>
                <li><NavLink>Favourites</NavLink></li>
                <li><NavLink>Log in</NavLink></li>
                {/* <li>{ (isLogin)? "Login": "Logout" }{user?.email ? `(${user?.email})` : ""}</p></li> */}
            </ul>
        </header>
       {/* { (isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>} */}
    </>
  )
}

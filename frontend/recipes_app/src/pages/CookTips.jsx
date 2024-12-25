import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import logo from '../assets/logo.png';
import TipItems from '../components/TipItems';
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'


export default function CookTips() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    const addReview = () => {
        let token = localStorage.getItem("token")

        if (token) {
            navigate("/addTip")
        } else {
            setIsOpen(true)
        }
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.email === 'admin@mail.ru';
    return (
            <>
                <section className="home" style={{height: "fit-content", paddingBottom: 30}}> 
                    <div className="left">
                        <h1>Кулинарные советы</h1>
                        <h4>Здесь Вы можете поделиться своим советом с другими пользователями и просмотреть их советы</h4>
                        {!isAdmin && (
                            <button onClick={addReview} style={{marginTop:'3rem', width: "fit-content"}}>ПОДЕЛИТЬСЯ СОВЕТОМ</button>
                        )}
                    </div>
                    <div className="right">
                        <img src={logo} width="320px" height="320px" alt="" />
                    </div>
                </section>

                <div className='recipe'>
                    <h2 style={{textAlign:"center"}}>Советы пользователей сайта: </h2>
                    <TipItems/>
                </div>
    
                {(isOpen) && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} /></Modal>}
    
                
            </>
        )
}
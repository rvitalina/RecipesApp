import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import logo from '../assets/logo.png';
import ReviewItems from '../components/ReviewItems';
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'


export default function Reviews() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    const addReview = () => {
        let token = localStorage.getItem("token")

        if (token) {
            navigate("/addReview")
        } else {
            setIsOpen(true)
        }
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.email === 'admin@mail.ru';
    return (
        <>
            <section className="home" style={{ height: "fit-content", paddingBottom: 30 }}>
                <div className="left">
                    <h1>Ваше мнение важно для нас!</h1>
                    <h4>Если Вам нравится наш сайт рецептов, оставьте пожалуйста оценку и свои впечатления. Если вам что-то не нравится, также сообщите нам ваши замечания и предложения</h4>
                    {!isAdmin && (
                        <button onClick={addReview} style={{ marginTop: '3rem' }}>ОСТАВИТЬ ОТЗЫВ</button>
                    )}
                </div>
                <div className="right">
                    <img src={logo} width="320px" height="320px" alt="" />
                </div>
            </section>

            <div className='recipe'>
                <h2 style={{ textAlign: "center" }}>Отзывы пользователей сайта: </h2>
                <ReviewItems />
            </div>

            {(isOpen) && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} /></Modal>}


        </>
    )
}
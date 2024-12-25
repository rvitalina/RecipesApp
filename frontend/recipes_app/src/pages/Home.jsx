import React from 'react';
import logo from '../assets/logo.png';
import RecipeItems from '../components/RecipeItems';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'
import { useState } from 'react';

export default function Home() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const addRecipe = () => {
        let token = localStorage.getItem("token")

        if (token) {
            navigate("/addRecipe")
        } else {
            setIsOpen(true)
        }
    }

    return (
        <>
            <section className="home">
                <div className="left">
                    <h1>Все рецепты теперь в одном месте!</h1>
                    <h5>
                        Создавайте и публикуйте свои собственные рецепты, делясь оригинальными идеями с нашим сообществом. Будь то семейный рецепт, который передавался из поколения в поколение, или новое творение, мы рады видеть ваши кулинарные шедевры!
                        Найден идеальный рецепт? Сохраняйте его в своем списке избранных, чтобы всегда иметь под рукой свои любимые блюда. Легко и удобно!
                        Ваше мнение важно! Пишите отзывы о рецептах, которые вы пробовали, и помогайте другим пользователям выбрать лучшие идеи для приготовления. Обмен опытом делает наше сообщество сильнее!
                        У вас есть секреты приготовления, которые могут помочь другим? Делитесь своими советами и трюками в кулинарии, и вместе мы создадим атмосферу поддержки и вдохновения.
                    </h5>
                    <button onClick={addRecipe}>Поделиться рецептом</button>
                </div>
                <div className="right">
                    <img src={logo} width="320px" height="320px" alt="" />
                </div>
            </section>
            <div className='bg'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FFAD84" fillOpacity="1" d="M0,128L26.7,149.3C53.3,171,107,213,160,224C213.3,235,267,213,320,192C373.3,171,427,149,480,144C533.3,139,587,149,640,170.7C693.3,192,747,224,800,202.7C853.3,181,907,107,960,90.7C1013.3,75,1067,117,1120,160C1173.3,203,1227,245,1280,240C1333.3,235,1387,181,1413,154.7L1440,128L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path></svg>
            </div>

            {(isOpen) && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} /></Modal>}

            <div className='recipe'>
                <RecipeItems />
            </div>
        </>
    )
}
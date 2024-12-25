import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function PersonalData() {
    const navigate = useNavigate();
    const [recipeData, setRecipeData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/recipe/${id}`);
                const res = response.data;
                const user = JSON.parse(localStorage.getItem('user')); // Получаем данные пользователя

                setRecipeData({
                    title: res.title,
                    preparingTime: res.preparingTime,
                    calories: res.calories,
                    difficulty: res.difficulty,
                    mealTime: res.mealTime,
                    ingredients: res.ingredients,
                    coverImage: res.coverImage,
                    instructions: res.instructions,
                    userId: user ? user.id : null // Проверяем наличие пользователя
                });
            } catch (error) {
                console.error('Error fetching recipe data:', error);
                // Здесь можно установить состояние ошибки для отображения пользователю
            }
        };

        getData();
    }, [id]); // Добавляем id в зависимости

    return (
        <>
            <section className="home" style={{ height: "fit-content", paddingBottom: 30 }}>
                <div className="left">
                    <h1 style={{textTransform:"uppercase"}}>{recipeData.title}</h1>
                    <hr />
                    <h4>Время приготовления: {recipeData.preparingTime} мин</h4>
                    <h4>Калорийность: {recipeData.calories} ккал</h4>
                    <h4>Сложность: {recipeData.difficulty}</h4>
                    <h4>Время приема пищи: {recipeData.mealTime}</h4>
                    <h4>Ингредиенты:</h4>
                    <ul style={{marginLeft:20}}>
                        {recipeData.ingredients && recipeData.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h4>Инструкции:</h4>
                    <p>{recipeData.instructions}</p>
                </div>
                <div className="right">
                    <img 
                        src={recipeData.coverImage ? `${import.meta.env.VITE_REACT_API_URL}/${recipeData.coverImage}` : "../assets/nofoto.jpg"} 
                        width="320px" 
                        height="300px" 
                        alt={recipeData.title} 
                    />
                </div>
                
            </section>
            <button onClick={() => navigate('/')} style={{ margin: '20px', padding: '10px', backgroundColor: 'coral', color: 'white' }}>
                Вернуться на главную
            </button>
        </>
    );
}
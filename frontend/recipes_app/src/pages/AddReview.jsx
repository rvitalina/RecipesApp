import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddFoodReview() {
    const [reviewData, setReviewData] = useState({});
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();


    const fetchUserReview = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/review/${user.id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching user review:", error);
            return null;
        }
    }

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setReviewData(prev => ({ ...prev, [name]: value }));
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        if (reviewData.rate < 1 || reviewData.rate > 5) {
            window.alert("Пожалуйста, введите оценку от 1 до 5.");
            return;
        }
        // Проверяем наличие отзыва у пользователя
        const userReview = await fetchUserReview();

        if (userReview) {
            window.alert("Вы уже опубликовали свой отзыв. Вы не можете добавить более одного отзыва.")
            return;
        }

        try {
            await axios.post(`${import.meta.env.VITE_REACT_API_URL}/review`, reviewData, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'bearer ' + localStorage.getItem("token")
                }
            });
            navigate("/");
        } catch (error) {
            console.error("Ошибка при отправке отзыва:", error);
        }
    }

    useEffect(() => {
        setReviewData(prev => ({ ...prev, userId: user.id }));
    }, [user.id]);

    return (
        <div className='container'>
            <form className='form' onSubmit={onHandleSubmit}>
                <div className='form-control'>
                    <label>Оценка</label>
                    <input placeholder="Значение от 1 до 5 включительно" type="text" className='input' name="rate" onChange={onHandleChange} required/>
                </div>
                <div className='form-control'>
                    <label>Комментарий</label>
                    <input placeholder="Введите текст..." type="text" className='input' name="content" onChange={onHandleChange} required/>
                </div>
                <button type="submit">Опубликовать отзыв</button>
            </form>
        </div>
    );
}
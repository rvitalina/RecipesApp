import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddCookTip() {
    const [tipData, setTipData] = useState({});
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setTipData(prev => ({ ...prev, [name]: value }));
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();

        // Валидация формы
        if (!tipData.title || !tipData.content) {
            setError("Пожалуйста, заполните все поля.");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/tip`, {
                ...tipData,
                userId: user.id // Добавляем userId в данные
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            navigate("/tip");
        } catch (error) {
            console.error("Ошибка при отправке совета:", error);
            setError("Не удалось опубликовать совет. Пожалуйста, попробуйте позже.");
        }
    }

    return (
        <div className='container'>
            <form className='form' onSubmit={onHandleSubmit}>
                <div className='form-control'>
                    <label>Заголовок</label>
                    <input placeholder="Введите заголовок для совета..." type="text" className='input' name="title" onChange={onHandleChange} required/>
                </div>
                <div className='form-control'>
                    <label>Основной текст</label>
                    <input placeholder="Введите текст..." type="text" className='input' name="content" onChange={onHandleChange} required/>
                </div>
                <button type="submit">Опубликовать совет</button>
            </form>
        </div>
    );
}
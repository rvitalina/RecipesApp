import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';

export default function ReviewItems() {
    const [allReviews, setAllReviews] = useState([]);
    const [users, setUsers] = useState({});
    const user = JSON.parse(localStorage.getItem("user")); // Получаем текущего пользователя

    useEffect(() => {
        const getAllReviews = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/review`);
                if (Array.isArray(response.data)) {
                    setAllReviews(response.data);
                    fetchUsers(response.data); // Получаем пользователей на основе отзывов
                } else {
                    console.error('Retrieved data is not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        const fetchUsers = async (reviews) => {
            const userIds = [...new Set(reviews.map(review => review.userId))]; // Уникальные userId
            const userPromises = userIds.map(id => 
                axios.get(`${import.meta.env.VITE_REACT_API_URL}/user/${id}`)
            );

            try {
                const userResponses = await Promise.all(userPromises);
                const usersData = {};
                userResponses.forEach((resp) => {
                    const user = resp.data;
                    if (user && user.id && user.email) {
                        usersData[user.id] = user.email; // Сохраняем email по user.id
                    } else {
                        console.warn('Получены некорректные данные пользователя:', user);
                    }
                });
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        getAllReviews();
    }, []);

    const onDelete = async (reviewId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_REACT_API_URL}/review/${reviewId}`, {
                headers: {
                    'authorization': 'bearer ' + localStorage.getItem("token")
                }
            });
            // Удаляем отзыв из состояния
            setAllReviews(prevReviews => prevReviews.filter(review => review.userId !== reviewId));
        } catch (error) {
            console.error('Ошибка при удалении отзыва:', error);
        }
    };

    return (
        <>
            <div className="container-for-reviews">
                {allReviews.map((item, index) => (
                    <div key={index} className='review-card'>
                        <div className="title">Автор: {users[item.userId] || 'Неизвестный пользователь'}</div>
                        <div className="rate">Оценка (от 1 до 5): {item.rate}</div>
                        <div>Комментарий: {item.content}</div>

                        {/* Проверяем, вошел ли пользователь и отображаем кнопку удаления только для его отзыва */}
                        {user && item.userId === user.id && (
                            <div>
                                <button className='review-del-button' onClick={() => onDelete(item.userId)}>УДАЛИТЬ МОЙ ОТЗЫВ</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}
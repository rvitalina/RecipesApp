import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';

export default function TipItems() {
    const [allTips, setAllTips] = useState([]);
    const [users, setUsers] = useState({});
    const user = JSON.parse(localStorage.getItem("user")); // Получаем текущего пользователя

    useEffect(() => {
        const getAllTips = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/tip`);
                if (Array.isArray(response.data)) {
                    setAllTips(response.data);
                    fetchUsers(response.data); // Получаем пользователей на основе отзывов
                } else {
                    console.error('Retrieved data is not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching tips:', error);
            }
        };

        const fetchUsers = async (tips) => {
            const userIds = [...new Set(tips.map(tip => tip.userId))]; // Уникальные userId
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

        getAllTips();
    }, []);

    const onDelete = async (tipId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_REACT_API_URL}/tip/${tipId}`, {
                headers: {
                    'authorization': 'bearer ' + localStorage.getItem("token")
                }
            });
            setAllTips(prevTips => prevTips.filter(tip => tip.id !== tipId));
        } catch (error) {
            console.error('Ошибка при удалении отзыва:', error);
        }
    };

    return (
        <>
            <div className="container-for-reviews">
                {allTips.map((item, index) => (
                    <div key={index} className='tip-card'>
                        <div className="title" style={{ fontSize: "1.1rem" }}>Автор: {users[item.userId] || 'Неизвестный пользователь'}<hr /></div>
                        <div><p className='tip-title'>{item.title}</p></div>
                        <div style={{ fontSize: "1.3rem" }}>{item.content}</div>

                        {user && item.userId === user.id && (
                            <div>
                                <button className='review-del-button' onClick={() => onDelete(item.id)}>УДАЛИТЬ МОЙ СОВЕТ</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}
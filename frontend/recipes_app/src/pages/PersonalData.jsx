import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function PersonalData() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [usersList, setUsersList] = useState([]); // Состояние для списка пользователей
    const isAdmin = email === 'admin@mail.ru'; // Проверка, является ли пользователь администратором

    const handleUpdateUser = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`${import.meta.env.VITE_REACT_API_URL}/user/${user.id}`, {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("Данные пользователя успешно обновлены:", response.data);
            setEmail(response.data.email);
            setPassword('');
        } catch (err) {
            setError(err.response?.data?.error || "Ошибка при обновлении данных");
        }
    };

    const fetchUsersList = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsersList(response.data);
        } catch (err) {
            console.error("Ошибка при получении списка пользователей:", err);
        }
    };

    const onDelete = async (userId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${import.meta.env.VITE_REACT_API_URL}/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsersList(usersList.filter(user => user.id !== userId)); // Обновляем состояние
            console.log("Пользователь успешно удален");
        } catch (err) {
            console.error("Ошибка при удалении пользователя:", err);
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Report about all users", 14, 22);

        const tableColumn = ["ID", "Email", "Hashed password"];
        const tableRows = [];

        usersList.forEach(user => {
            const userData = [
                user.id,
                user.email,
                user.password
            ];
            tableRows.push(userData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 30 });
        doc.save("users_report.pdf");
    };

    const generateExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(usersList.map(user => ({
            ID: user.id,
            Email: user.email,
            "Hashed password": user.password
        })));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

        // Создаем файл Excel и инициируем его скачивание
        XLSX.writeFile(workbook, "users_report.xlsx");
    };

    useEffect(() => {
        if (isAdmin) {
            fetchUsersList(); // Получаем список пользователей, если это администратор
        }
    }, [isAdmin]);

    return (
        <>
            <section className="home">
                <div className="left" style={{width: "600px", height:'fit-content'}}>
                    <h1>Личный кабинет</h1>
<hr />
                    {!isAdmin &&
                        <h4>Электронная почта:&emsp;
                            <input 
                                type="email" 
                                className='cabinet-input' 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </h4>
                    }
                    
                    <h4>Пароль:&emsp;
                        <input 
                            type="password" 
                            className='cabinet-input' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </h4>
                    <button style={{ marginTop: '3rem' }} onClick={handleUpdateUser}>ИЗМЕНИТЬ</button>

                    {error && <h6 className='error'>{error}</h6>}

                    {isAdmin && (
                        <div>
                            <h2 style={{marginTop:30, marginBottom:5}}>Список пользователей</h2>
                            <hr />
                            <br />
                            <button onClick={generatePDF} style={{ marginBottom: '20px', width:"fit-content", padding: '0.5rem', marginRight: 15 }}>Сформировать PDF отчет</button>
                            <button onClick={generateExcel} style={{ marginBottom: '20px', width:"fit-content", padding: '0.5rem' }}>Сформировать EXCEL отчет</button>

                            <table>
                                <thead>
                                    <tr>
                                        <th>ЭЛ. ПОЧТА</th>
                                        <th>ПАРОЛЬ</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersList.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.email}</td>
                                            <td>{user.password}</td>
                                            <td><MdDelete onClick={() => onDelete(user.id)} className='deleteIcon' /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
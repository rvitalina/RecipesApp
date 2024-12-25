import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function AddFoodRecipe() {

    const [recipeData, setRecipeData] = useState({});
    const user = JSON.parse(localStorage.getItem("user"))

    const navigate = useNavigate()

    const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients") ? e.target.value.split(",") : (e.target.name === "file") ? e.target.files[0] : e.target.value
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault()
        console.log(recipeData)
        await axios.post(`${import.meta.env.VITE_REACT_API_URL}/recipe`, recipeData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': 'bearer ' + localStorage.getItem("token")
            }
        })
            .then(() => navigate("/"))
    }

    useEffect(() =>
        setRecipeData(pre => ({ ...pre, userId: user.id })),
        [])

    return (
        <>
            <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>
                    <div className='form-control'>
                        <label>Название</label>
                        <input type="text" className='input' name="title" onChange={onHandleChange} required></input>
                    </div>
                    <div className='form-control'>
                        <label>Время пригот. (мин)</label>
                        <input type="text" className='input' name="preparingTime" onChange={onHandleChange} required></input>
                    </div>
                    <div className='form-control'>
                        <label>Калорийность</label>
                        <input type="text" className='input' name="calories" onChange={onHandleChange} required></input>
                    </div>
                    <div className='form-control'>
                        <label>Сложность</label>
                        <select className='input' name="difficulty" onChange={onHandleChange} required>
                            <option value="" disabled selected>Выберите сложность рецепта</option>
                            <option value="простой">простой</option>
                            <option value="средний">средний</option>
                            <option value="сложный">сложный</option>
                        </select>
                    </div>
                    <div className='form-control'>
                        <label>Прием пищи</label>
                        <select className='input' name="mealTime" onChange={onHandleChange} required>
                            <option value="" disabled selected>Выберите время приема пищи</option>
                            <option value="завтрак">завтрак</option>
                            <option value="обед">обед</option>
                            <option value="ужин">ужин</option>
                            <option value="дессерт">дессерт</option>
                        </select>
                    </div>
                    <div className='form-control'>
                        <label>Ингредиенты</label>
                        <textarea placeholder='Введите ингридиенты через запятую без пробелов...' type="text" className='input-textarea' name="ingredients" rows="5" onChange={onHandleChange} required></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Инструкция</label>
                        <textarea type="text" className='input-textarea' name="instructions" rows="5" onChange={onHandleChange} required></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Картинка блюда</label>
                        <input type="file" className='input' name="file" onChange={onHandleChange}></input>
                    </div>
                    <button type="submit">СОЗДАТЬ РЕЦЕПТ</button>
                </form>
            </div>
        </>
    )
}

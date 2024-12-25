import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditRecipe() {
    const [recipeData, setRecipeData] = useState({})
    const navigate = useNavigate()
    const{id}=useParams()
    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(()=>{
        const getData=async()=>{
            await axios.get(`${import.meta.env.VITE_REACT_API_URL}/recipe/${id}`)
            .then(response=>{
                let res=response.data
                setRecipeData({
                    title:res.title,
                    preparingTime: res.preparingTime,
                    calories: res.calories, 
                    difficulty: res.difficulty,
                    mealTime: res.mealTime,
                    ingredients:res.ingredients,
                    instructions:res.instructions, 
                    userId: user.id
                })
            })
        }
        getData()
    },[])

    const onHandleChange = (e) => {
        let val = (e.target.name == "ingredients") ? e.target.value.split(",") : (e.target.name === "file") ? e.target.files[0] : e.target.value
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
    }

    const onHandleIngredientsChange = (e) =>{
        let val = e.target.value.split(",");
        setRecipeData({...recipeData, "ingredients": val})
    }
    
    const onHandleSubmit = async (e) => {
        e.preventDefault()
        console.log(recipeData)
        await axios.put(`${import.meta.env.VITE_REACT_API_URL}/recipe/${id}`, recipeData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
            .then(() => navigate("/myRecipe"))
    }

    // useEffect(() =>
    //     setRecipeData(pre => ({ ...pre, userId: user.id })), 
    // [])
    return (
        <>
            <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>
                    <div className='form-control'>
                        <label>Title</label>
                        <input type="text" className='input' name="title" onChange={onHandleChange} value={recipeData.title}></input>
                    </div>
                    <div className='form-control'>
                        <label>Preparing time (min)</label>
                        <input type="text" className='input' name="preparingTime" onChange={onHandleChange} value={recipeData.preparingTime}></input>
                    </div>
                    <div className='form-control'>
                        <label>Calories</label>
                        <input type="text" className='input' name="calories" onChange={onHandleChange} value={recipeData.calories}></input>
                    </div>
                    <div className='form-control'>
                        <label>Difficulty</label>
                        <input type="text" className='input' name="difficulty" onChange={onHandleChange} value={recipeData.difficulty}></input>
                    </div>
                    <div className='form-control'>
                        <label>Meal time</label>
                        <input type="text" className='input' name="mealTime" onChange={onHandleChange} value={recipeData.mealTime}></input>
                    </div>
                    <div className='form-control'>
                        <label>Ingredients</label>
                        <textarea type="text" className='input-textarea' name="ingredients" rows="5" onChange={onHandleIngredientsChange} value={recipeData.ingredients}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Instructions</label>
                        <textarea type="text" className='input-textarea' name="instructions" rows="5" onChange={onHandleChange} value={recipeData.instructions}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Recipe Image</label>
                        <input type="file" className='input' name="file" onChange={onHandleChange}></input>
                    </div>
                    <button type="submit">Edit Recipe</button>
                </form>
            </div>
        </>
    )
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsStopwatchFill } from "react-icons/bs";
import { FaEdit, FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
// import generatePDF from '../../src/downloadPDF';
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable'
// import font from '../fonts/Inter_18pt-Regular.ttf';
// import "@fontsource/roboto/400.css";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

export default function RecipeItems() {
    const [allRecipes, setAllRecipes] = useState([]);
    const [myRecipes, setMyRecipes] = useState([]);
    const [favRecipes, setFavRecipes] = useState([]);
    const [sortOrder, setSortOrder] = useState('');
    const [mealTimeFilter, setMealTimeFilter] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [excludedIngredient, setExcludedIngredient] = useState(''); 
    const [includedIngredients, setIncludedIngredients] = useState('');
    const [randomRecipe, setRandomRecipe] = useState(null);

    let path = window.location.pathname;

    useEffect(() => {
        const getAllRecipes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/recipe`);
                if (Array.isArray(response.data)) {
                    setAllRecipes(response.data);
                } else {
                    console.error('Retrieved data is not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        const getMyRecipes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/recipe`);
                const user = JSON.parse(localStorage.getItem('user'));
                if (Array.isArray(response.data) && user) {
                    const filteredRecipes = response.data.filter(item => item.userId === user.id);
                    setMyRecipes(filteredRecipes);
                } else {
                    console.error("Received data is not an array or user is null");
                }
            } catch (error) {
                console.error('Error fetching my recipes:', error);
            }
        };

        getAllRecipes();
        getMyRecipes();

        // Load favorite recipes from localStorage
        const loadFavRecipes = () => {
            const favItems = JSON.parse(localStorage.getItem("fav")) || [];
            setFavRecipes(favItems);
        };

        loadFavRecipes();
    }, []);

    const onDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_REACT_API_URL}/recipe/${id}`);
            console.log("Recipe deleted from database");

            // Обновляем состояния после удаления
            setAllRecipes(recipes => recipes.filter(recipe => recipe.id !== id));
            setMyRecipes(recipes => recipes.filter(recipe => recipe.id !== id));

            // Удаляем из списка любимых, если он там есть
            setFavRecipes(recipes => {
                const updatedFavs = recipes.filter(recipe => recipe.id !== id);
                localStorage.setItem("fav", JSON.stringify(updatedFavs)); // Обновляем локальное хранилище
                return updatedFavs;
            });
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const favRecipe = (item) => {
        let favItems = JSON.parse(localStorage.getItem("fav")) || [];
        const isFav = favItems.some(recipe => recipe.id === item.id);
        if (isFav) {
            favItems = favItems.filter(recipe => recipe.id !== item.id);
        } else {
            favItems.push(item);
        }
        localStorage.setItem("fav", JSON.stringify(favItems));
        setFavRecipes(favItems);
    };

    const getRandomRecipe = () => {
        if (allRecipes.length > 0) {
            const randomIndex = Math.floor(Math.random() * allRecipes.length);
            setRandomRecipe(allRecipes[randomIndex]);
        }
    };

    //before random
    // const displayedRecipes = path === "/favRecipe" ? favRecipes : (path === "/myRecipe" ? myRecipes : allRecipes);

    const displayedRecipes = randomRecipe ? [randomRecipe] : (path === "/favRecipe" ? favRecipes : (path === "/myRecipe" ? myRecipes : allRecipes));

    const filteredRecipes = displayedRecipes
        .filter(item => (mealTimeFilter ? item.mealTime === mealTimeFilter : true))
        .filter(item => (difficultyFilter ? item.difficulty === difficultyFilter : true))
        .filter(item => (searchQuery ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) : true))
        .filter(item => (excludedIngredient ? !item.ingredients.includes(excludedIngredient) : true));
        // .filter(item => {
        //     const ingredientsArray = includedIngredients.split(',').map(ingredient => ingredient.trim().toLowerCase());
        //     return ingredientsArray.length > 0 && 
        //            ingredientsArray.every(ingredient => item.ingredients.map(i => i.toLowerCase()).includes(ingredient)) &&
        //            ingredientsArray.length === item.ingredients.length; // Полное совпадение по количеству
        // })


    const sortRecipes = (recipes) => {
        let sortedRecipes = [...recipes]; // Копируем массив, чтобы не изменять оригинал
        if (sortOrder === "time_asc") {
            return sortedRecipes.sort((a, b) => a.preparingTime - b.preparingTime);
        } else if (sortOrder === "time_desc") {
            return sortedRecipes.sort((a, b) => b.preparingTime - a.preparingTime);
        } else if (sortOrder === "alphabetical") {
            return sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === "calories_asc") {
            return sortedRecipes.sort((a, b) => a.calories - b.calories);
        } else if (sortOrder === "calories_desc") {
            return sortedRecipes.sort((a, b) => b.calories - a.calories);
        } else if (sortOrder === "ingred_amount_asc") {
            return sortedRecipes.sort((a, b) => a.ingredients.length - b.ingredients.length);
        } else if (sortOrder === "ingred_amount_desc") {
            return sortedRecipes.sort((a, b) => b.ingredients.length - a.ingredients.length);
        }
        return sortedRecipes;
    };
    
    // let recipesToDisplay;
    // if(includedIngredients('')) {
    //     recipesToDisplay = filteredRecipes
    // } else {
    //     recipesToDisplay = 
    // }

    const handleReset = () => {
        setSortOrder('');
        setMealTimeFilter('');
        setDifficultyFilter('');
        setSearchQuery('')
        setExcludedIngredient('')
        setIncludedIngredients('')
        setRandomRecipe(null);
    };

    return (
        <>
            {/* <button onClick={generatePDF} style={{ margin: '20px', padding: '10px', backgroundColor: 'coral', color: 'white' }}>
                Сохранить в PDF
            </button>
            <button onClick={generateWord} style={{ margin: '20px', padding: '10px', backgroundColor: 'coral', color: 'white' }}>
                Сохранить в word
            </button> */}
            <div className="buttons-for-list">
                <input
                    type="text"
                    placeholder="Поиск рецепта по названию..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="buttons-for-list" style={{flexDirection: 'column'}}>
                <h4>Введите ингридиент, которого не должно быть в рецепте:</h4>
                <input 
                    type="text" 
                    placeholder="Введите ингредиент..." 
                    value={excludedIngredient} 
                    onChange={(e) => setExcludedIngredient(e.target.value)} 
                />
            </div>

            <div className="buttons-for-list" style={{flexDirection: 'column'}}>
                <h4>Введите ингредиенты, которые есть у вас:</h4>
                <input 
                    type="text" 
                    placeholder="Ингредиенты, которые есть у вас (через запятую)..." 
                    value={includedIngredients} 
                    onChange={(e) => setIncludedIngredients(e.target.value)} 
                />
            </div>
            
            <div className="buttons-for-list">
                <select
                    name="sortings"
                    id="sortings"
                    onChange={(e) => setSortOrder(e.target.value)}
                    value={sortOrder}
                >
                    <option value="">СОРТИРОВАТЬ ПО ...</option>
                    <option value="time_asc">времени приготовления &uarr;</option>
                    <option value="time_desc">времени приготовления &darr;</option>
                    <option value="alphabetical">названию (A-Я)</option>
                    <option value="calories_asc">калориям &uarr;</option>
                    <option value="calories_desc">калориям &darr;</option>
                    <option value="ingred_amount_asc">кол-ву ингридиентов &uarr;</option>
                    <option value="ingred_amount_desc">кол-ву ингридиентов &darr;</option>

                </select>
                <button onClick={handleReset}>Сброс фильтров</button>
            </div>

            <div className="buttons-for-list">
                <button onClick={() => setMealTimeFilter('завтрак')}>Завтраки</button>
                <button onClick={() => setMealTimeFilter('обед')}>Обеды</button>
                <button onClick={() => setMealTimeFilter('ужин')}>Ужины</button>
                <button onClick={() => setMealTimeFilter('дессерт')}>Дессерты</button>
            </div>

            <div className="buttons-for-list">
                <button onClick={() => setDifficultyFilter('простой')}>Простые</button>
                <button onClick={() => setDifficultyFilter('средний')}>Средние</button>
                <button onClick={() => setDifficultyFilter('сложный')}>Сложные</button>
            </div>

            <div className="buttons-for-list">
                <button className='random-btn' onClick={getRandomRecipe}>Случайный рецепт</button>
            </div>

            <div className="card-container">
                {sortRecipes(filteredRecipes)?.map((item, index) => (
                    <div key={index} className='card'>
                        <img src={item.coverImage ? `${import.meta.env.VITE_REACT_API_URL}/${item.coverImage}` : "../assets/nofoto.jpg"} width="120px" height="100px" alt="" />
                        <div className="card-body">
                            <div className="title">{item.title}</div>
                            <div className="icons">
                                <div className="timer"><BsStopwatchFill />{item.preparingTime} мин</div>
                                {
                                    (path === "/favRecipe") ? (
                                        <FaHeart onClick={() => favRecipe(item)}
                                            style={{ color: (favRecipes.some(res => res.id === item.id)) ? "red" : "" }} />
                                    ) : (path === "/myRecipe") ? (
                                        <div className="action">
                                            <Link to={`/editRecipe/${item.id}`} className='editIcon'><FaEdit /></Link>
                                            <MdDelete onClick={() => onDelete(item.id)} className='deleteIcon' />
                                        </div>
                                    ) : (
                                        <FaHeart onClick={() => favRecipe(item)}
                                            style={{ color: (favRecipes.some(res => res.id === item.id)) ? "red" : "" }} />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
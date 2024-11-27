import React, { useEffect, useState } from 'react';
import axios from 'axios';
import syrnikiImg from '../assets/syrniki.jpg'
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { BsFire } from "react-icons/bs";

export default function RecipeItems() {
    const [allRecipes, setAllRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/recipe');
                if (Array.isArray(response.data)) {
                    setAllRecipes(response.data);
                } else {
                    console.error('Retrieved data is not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <div className="card-container">
            {allRecipes.map((item, index) => (
                <div key={index} className='card'>
                    <img src={syrnikiImg} width="120px" height="100px" alt="" />
                    <div className="card-body">
                        <div className="title">{item.title}</div>
                        <div className="icons">
                            <div className="timer"><BsStopwatchFill />{item.preparingTime} мин</div>
                            <div className="timer"><BsFire />{item.calories} ккал</div>
                            <FaHeart />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
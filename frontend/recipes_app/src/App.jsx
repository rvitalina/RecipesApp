import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import AddFoodRecipe from './pages/AddFoodRecipe'
import MainNavigation from './components/MainNavigation';
import axios from 'axios';
import EditRecipe from './pages/EditRecipe';
import Reviews from './pages/Reviews';
import AddReview from './pages/AddReview';
import AddCookTip from './pages/AddCookTip';
import CookTips from './pages/CookTips';
import PersonalData from './pages/PersonalData';
import RecipeDetails from './pages/RecipeDetails';

const router = createBrowserRouter([
  {
    path: "/", element: <MainNavigation />, children: [
      { path: "/", element: <Home /> },
      { path: "/myRecipe", element: <Home /> },
      { path: "/favRecipe", element: <Home /> },
      { path: "/addRecipe", element: <AddFoodRecipe /> },
      { path: "/editRecipe/:id", element: <EditRecipe /> },
      { path: "/review", element: <Reviews /> },
      { path: "/addReview", element: <AddReview /> },
      { path: "/tip", element: <CookTips /> },
      { path: "/addTip", element: <AddCookTip /> },
      { path: "/personalData", element: <PersonalData /> },
      { path: "/recipeDetails/:id", element: <RecipeDetails /> },

    ]
  }
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}
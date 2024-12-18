import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
// import store from "./store/store.js";
import { Component, Suspense } from "react";

createRoot(document.getElementById('root')).render(
  // <Suspense fallback="...loaging">
  //     <Provider store={store}>
        <App />
      // </Provider>
    //</Suspense> 
)

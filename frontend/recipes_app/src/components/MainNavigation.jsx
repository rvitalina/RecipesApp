import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

export default function MainNavigation() {
    return(
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}
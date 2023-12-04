import React from 'react';
import "./Navbar.css"
import {NavLink, Routes} from "react-router-dom";
const Navbar = () => {
    return (
        <div className="navbar">
            <div className='left_links'>
                <NavLink to='/' className="navbar_link">$logo$</NavLink>
                <NavLink to='/' className="navbar_link">Главная</NavLink>
                <NavLink to='/' className="navbar_link">Платежи и переводы</NavLink>
                <NavLink to='/' className="navbar_link">Курсы Валют</NavLink>
                <NavLink to='/' className="navbar_link">Отделения банка</NavLink>
            </div>
            <div className='right_links'>
                <NavLink to='/' className="navbar_link">Имя</NavLink>
                <NavLink to='/' className="navbar_link">Выйти</NavLink>
            </div>
        </div>
    );
};
export default Navbar;
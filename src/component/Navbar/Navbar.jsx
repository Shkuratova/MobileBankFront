import React from 'react';
import "./Navbar.css"
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <NavLink to='/home' >
                <img src="/images/mainIcon.png" className="navimg"/>
            </NavLink>
            <div className='left_links'>
                <NavLink to='/home' className="navbar_link">Главная</NavLink>
                <NavLink to='/payment' className="navbar_link">Платежи и переводы</NavLink>
                <NavLink to='/currency' className="navbar_link">Курсы валют</NavLink>
                <NavLink to='/atm' className="navbar_link">Отделения банка</NavLink>
            </div>
            <div className='right_links'>
                <NavLink to='/user/:login' className="navbar_link">Имя</NavLink>
            </div>
            <NavLink to='/' className="navbar_link">
                <img src="/images/exit.png" width='20' height='20' />
            </NavLink>
        </div>
    );
};
export default Navbar;
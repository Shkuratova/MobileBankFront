import React, {useEffect} from 'react';
import "./Navbar.css"
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import PersonStore from "../../store/PersonStore";

const Navbar = () => {
    const {isAuth,  person, logout,Load, getPersonInfo} =PersonStore

    useEffect(() => {
        if(isAuth)
        getPersonInfo()
    }, [isAuth]);

    return (
             isAuth?
                <div className="navbar">
                    <NavLink to='/home'>
                        <img src="/images/mainIcon.png" className="navimg"/>
                    </NavLink>
                    <div className='left_links'>
                        <NavLink to='/home' className="navbar_link">Главная</NavLink>
                        <NavLink to='/payment' className="navbar_link">Платежи и переводы</NavLink>
                        <NavLink to='/currency' className="navbar_link">Курсы валют</NavLink>
                        <NavLink to='/atm' className="navbar_link">Отделения банка</NavLink>
                    </div>
                    <div className='right_links'>
                        {!Load?
                            <NavLink to={'/user/'+person.login} className="navbar_link">{person.firstName}</NavLink>
                        :
                       <></>
                        }
                    </div>
                    <div onClick={e=>logout()} className="navbar_link">
                        <img src="/images/exit.png" width='20' height='20'/>
                    </div>
                </div>

                 :
                <div>
                        <img src="/images/mainIcon.png" className="navimg"/>
                </div>

    );
};
export default observer(Navbar);
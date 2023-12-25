import React, {useContext, useEffect} from 'react';
import "./Navbar.css"
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context";
import {observer} from "mobx-react-lite";
import PersonStore from "../../store/PersonStore";

export const Navbar = observer(() => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const{person, getPersonInfo, Load} = PersonStore
    useEffect(() => {
        getPersonInfo()
    }, []);
    const router = useNavigate()
    const exit=()=>{
        router('/')
        setIsAuth(false)
    }
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
                        {person.firstName?
                            <NavLink to={'/user/'+person.login} className="navbar_link">{person.firstName}</NavLink>
                        :
                        <NavLink to='/home' className="navbar_link">Личный кабинет</NavLink>
                        }
                    </div>
                    <div onClick={exit} className="navbar_link">
                        <img src="/images/exit.png" width='20' height='20'/>
                    </div>
                </div>

                 :
                <div>
                        <img src="/images/mainIcon.png" className="navimg"/>
                </div>

    );
});
export default Navbar;
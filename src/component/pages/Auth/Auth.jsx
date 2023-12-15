import React, {useContext, useState} from 'react';
import '../../styles/Common.css'
import './Auth.css'
import {useNavigate} from "react-router-dom";
import {ATMS} from "../../utils/consts";
import {AuthContext} from "../../../context";
import {useForm} from "react-hook-form";

const Auth = () => {
    const {
        handleSubmit,
        register,
        formState:{errors},
    } = useForm({mode:"onChange"});
    const{isAuth, setIsAuth} = useContext(AuthContext)
    const router = useNavigate()
    const[state, setState] = useState('SignIn')
    const siqnIn=()=>{
        //запрос
       setIsAuth(true)
    }
    const inital=()=>{
        setState('Reg')
    }
    const finalReg=()=>{
        //запрос
        setState('regSuc')
    }
    return (
        <div className="page_chr">
            {state ==='SignIn' &&
            <div className="reg__modal">
                <h1 className='head__reg'>Добро пожаловать!</h1>
                <form className='reg__modal' style={{width:"100%"}} onSubmit={handleSubmit(siqnIn)}>
                <input className='reg__input'
                placeholder='Логин'
                />
                <input className='reg__input'
                placeholder='Пароль'
                       {...register("name",{
                           required:true,
                           pattern:/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                           minLength:8,
                           maxLength:20
                       })}/>
                    {errors.name?.type==="required" && <span style={{color:'red'}}>Поле не может быть пустым</span>}
                    {errors.name?.type==="pattern" && <span style={{color:'red'}}>Неверно введен пароль</span>}
                    {errors.name?.type==="minLength" && <span style={{color:'red'}}>Пароль должен содержать от 8 до 20 символов</span>}
                    {errors.name?.type==="maxLength" && <span style={{color:'red'}}>Пароль должен содержать от 8 до 20 символов</span>}
                <button className="reg__button">Продолжить</button>
                </form>
                <div className='reg__nav'>
                    <button  onClick={()=>setState('SignUp')} className='reg__link'>Зарегистрироваться</button>
                    <button onClick={()=>router(ATMS)} className='reg__link'>Ближайшие банкоматы</button>
                </div>
            </div>
            }
            {state ==='SignUp' &&
                <div className='reg__modal'>
                    <button onClick={()=>setState('SignIn')}
                        className='reg__link'>На главную</button>
                    <h1 className='head__reg'>Регистрация</h1>
                    <p>Введите номер счета</p>
                    <input className='reg__input'
                        />
                    <button onClick={inital}
                        className="reg__button">Продолжить</button>
                </div>
            }
            {
                state==='Reg' &&
                <div className="reg__modal">
                    <button onClick={()=>setState('SignIn')}
                            className='reg__link'>На главную</button>
                    <h3>Логин</h3>
                    <input className="reg__input"/>
                    <h3>Пароль</h3>
                    <input className="reg__input"/>
                    <span className='toolTip'>
                        Пароль должен содержать как минимум одну заглавную  и прописную буквы, цифры и хотя
                        бы один символ:!@#$%^&*_=+-
                    </span>
                    <button onClick={finalReg}
                        className="reg__button">Зарегистрироваться</button>
                </div>
            }
            {state==='regSuc'&&
                <div className="reg__modal">
                    <div style={{marginTop:"auto", marginBottom:"auto"}}>
                        <h1 className='head__reg'>Регистрация прошла успешно!</h1>
                        <button
                            onClick={()=>setState('SignIn')}
                            className="reg__button"
                            style={{marginLeft:"8%"}}>
                            Войти</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default Auth;
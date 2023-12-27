import React, {useContext, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../../../context";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

const RegForm = () => {
    const router = useNavigate()
    const [state, setState] = useState('SignUp')

    const[pas, setPas] = useState('')
    const[re_pas, setRePas] = useState('')
    const [log, setLog] = useState('')
    const [tfa_token, setTfa] = useState('')
    const[code, setCode] = useState('')
    const [account, setAccount] = useState('')

    const inital=(e)=>{

        e.preventDefault()
        setState('Reg')
    }
    const finalReg=(e)=>{
        e.preventDefault()
        // axios
        //     .post("/auth/registration/", {login:log, password:pas, re_password:re_pas, account:account})
        //     .then((response)=>{
        //         console.log(response.data);
        //         setTfa(response.data.tfa_token)
        //         setState('RegConfirm')
        //     })
        //     .catch(function (error){
        //         if(error.response){
        //             console.log(error.response.data)
        //         }
        //     });
    }
    const RegConfirm = (e)=> {
        e.preventDefault()
        // axios
        //     .put("/auth/registration/", {tfa_token:tfa_token, confirm_code:code})
        //     .then((response)=>{
        //         localStorage.setItem('token', response.data.access_token)
        //         localStorage.setItem('refresh', response.data.refresh_token)
        //         setIsAuth(true)
        //     })
        //     .catch(function (error){
        //         if(error.response){
        //             console.log(error.response.data)
        //         }
        //     });
    }
    return (
        <div className='page_chr'>
            {state ==='SignUp' &&
                <div className='reg__modal'>
                    <button onClick={()=>router('/')}
                            className='reg__link'>На главную</button>
                    <h1 className='head__reg'>Регистрация</h1>
                    <p>Введите номер счета</p>
                    <input className='reg__input'
                           value={account}
                           onChange={(e)=>setAccount(e.target.value)}
                    />
                    <button onClick={e=>inital(e)}
                            className="reg__button">Продолжить</button>
                </div>
            }
            {
                state==='Reg' &&
                <div className="reg__modal">
                    <button onClick={()=>router('/')}
                            className='reg__link'>На главную</button>
                    <h3>Логин</h3>
                    <input className="reg__input"
                           value={log}
                           onChange={(e)=>setLog(e.target.value)}
                    />
                    <h3>Пароль</h3>
                    <input
                        className="reg__input"
                        value={pas}
                        onChange={(e)=>setPas(e.target.value)}
                    />
                    <input
                        className='reg__input'
                        value={re_pas}
                        onChange={(e)=>setRePas(e.target.value)}
                    />
                    <span className='toolTip'>
                        Пароль должен содержать как минимум одну заглавную  и прописную буквы, цифры и хотя
                        бы один символ:!@#$%^&*_=+-
                    </span>
                    <button onClick={(e) => finalReg(e)}
                            className="reg__button">Зарегистрироваться</button>
                </div>
            }
            {
                state === 'RegConfirm' &&
                <div className='reg__modal'>
                    <h2>На вашу почту было выслано письмо с кодом подтверждения</h2>
                    <input placeholder='Код подтверждения'
                           value={code}
                           onChange={e=>setCode(e.target.value)}
                    />
                    <button onClick={e=>RegConfirm(e)}
                            className='reg__button'>Продолжить</button>
                </div>
            }
        </div>
    );
};

export default observer(RegForm);
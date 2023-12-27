import React, {useContext, useState} from 'react';
import '../../styles/Common.css'
import './Auth.css'
import {useNavigate} from "react-router-dom";
import {ATMS} from "../../../utils/consts";
import {AuthContext} from "../../../context";
import axios from "axios";
import {observer} from "mobx-react-lite";
import PersonStore from "../../../store/PersonStore";


const Auth = () => {
    const{isAuth, setAuth, SiqnIn, ConfirmLogin, AuthError} = PersonStore
    const router = useNavigate()
    const[state, setState] = useState('SignIn')

    const [pas, setPas] = useState('')
    const [log, setLog] = useState('')
    const[code, setCode] = useState('')


    const siqnIn=(e)=>{
        e.preventDefault()
        SiqnIn(log, pas)
        setState('Confirm')
    }
    const confirm=()=>{
        ConfirmLogin(code)

    }


    return (
        <div className="page_chr">
            {state ==='SignIn' &&
                <div className="reg__modal">
                    <h1 className='head__reg'>Добро пожаловать!</h1>
                    <form className='reg__modal' style={{width:"100%"}} onSubmit={(e)=>siqnIn(e)}>
                        <input className='reg__input'
                               placeholder='Логин'
                               value={log}
                               onChange={(e)=>setLog(e.target.value)}
                        />
                        <input className='reg__input'
                               placeholder='Пароль'
                               value={pas}
                               type={"password"}
                        onChange={(e)=>setPas(e.target.value)}/>
                        {AuthError&& <p className='error'>{AuthError}</p>}
                        <button className="reg__button">Продолжить</button>
                    </form>
                    <div className='reg__nav'>
                        <button  onClick={()=>router('/registration')} className='reg__link'>Зарегистрироваться</button>
                        <button onClick={()=>router(ATMS)} className='reg__link'>Ближайшие банкоматы</button>
                    </div>
                </div>
            }
            {state === 'Confirm' &&
                <div className='reg__modal'>
                    <h2>На вашу почту было выслано письмо с кодом подтверждения</h2>
                    <input className='reg__input'
                        placeholder='Код подтверждения'
                            value={code}
                            onChange={e=>setCode(e.target.value)}
                    />
                    <button onClick={confirm}
                        className='reg__button'>Продолжить</button>
                </div>

            }
        </div>
    );
};

export default observer(Auth);
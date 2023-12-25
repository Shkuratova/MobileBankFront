import React, {useContext, useState} from 'react';
import '../../styles/Common.css'
import './Auth.css'
import {useNavigate} from "react-router-dom";
import {ATMS} from "../../utils/consts";
import {AuthContext} from "../../../context";
import axios from "axios";


const Auth = () => {
    const{isAuth, setIsAuth} = useContext(AuthContext)
    const router = useNavigate()
    const[state, setState] = useState('SignIn')

    const [pas, setPas] = useState('')
    const [log, setLog] = useState('')
    const [tfa_token, setTfa] = useState('')
    const[code, setCode] = useState('')


    const siqnIn=(e)=>{
        e.preventDefault()
        axios
            .post("/auth/", {login:log, password:pas})
            .then((response)=>{
                console.log(response.data);
                setTfa(response.data.tfa_token)
                setState('Confirm')
            })
            .catch(function (error){
            if(error.response){
                console.log(error.response.data)
            }
        });
    }
    const confirm=()=>{
        axios
            .put("/auth/", {tfa_token:tfa_token, confirm_code:code})
            .then((response)=>{
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('ref_token', response.data.refresh_token);
                setIsAuth(true)
            })
            .catch(function (error){
                if(error.response){
                    console.log(error.response.data)
                }
            });
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

export default Auth;
import React, {useEffect, useState} from 'react';
import '../../styles/Common.css'
import './Auth.css'
import {useNavigate} from "react-router-dom";
import {ATMS} from "../../../utils/consts";
import {observer} from "mobx-react-lite";
import UserStore from "../../../store/UserStore";
import '../../UI/confirmCodeInput.css'
import VerifyInput from "../../UI/VerifyInput";
import EmailConfirm from "../../reUsePages/EmailConfirm";

const Auth = () => {
    const{tfa, SiqnIn, AuthError,  ConfirmLogin} = UserStore
    const router = useNavigate()
    const[state, setState] = useState('SignIn')

    const [pas, setPas] = useState('')
    const [log, setLog] = useState('')
    const[code, setCode] = useState('')
    // const[tfa, setTfa] = useState('')

    const[error, setError] = useState(null)
    useEffect(()=>{
        if(tfa)
            setState('Confirm')
    },[tfa])

    const siqnIn=async (e)=>{
        e.preventDefault()
        try{
            SiqnIn(log, pas)

        }catch (e)
        {
            console.log(e)
        }
        // try {
        //     const response = await AuthService.login(log, pas)
        //     console.log(response.data)
        //     setTfa(response.data.tfa_token)
        //     setState('Confirm')
        // }catch (e){
        //     setAuthError(e.response.data)
        //     console.log(e.response.data)
        // }

    }
    const confirm= async (e)=>{
        e.preventDefault()
        ConfirmLogin(code)
        // console.log(code)
        // try {
        //     const response = await AuthService.confirmation(tfa, code)
        //     localStorage.setItem('token', response.data.access_token)
        //     localStorage.setItem('ref_token', response.data.refresh_token)
        //     setAuth(true)
        // }catch (e){
        //     console.log(e)
        // }

    }
    return (
        <>
            {state ==='SignIn' &&
                <div className="reg__modal">
                    <h1 className='head__reg'>Добро пожаловать!</h1>
                    <form  className="reg_form" style={{width:"100%"}} onSubmit={(siqnIn)}>
                        <input className='myInput'
                               placeholder='Логин'
                               value={log}
                               onChange={(e)=>setLog(e.target.value)}
                        />
                        <input className='myInput'
                               placeholder='Пароль'
                               value={pas}
                               type={"password"}
                        onChange={(e)=>setPas(e.target.value)}/>
                        {AuthError&& <p className='error'>{AuthError}</p>}
                        <button className="myBtn">Продолжить</button>
                    </form>
                    <div className='reg__nav'>
                        <button  onClick={()=>router('/registration')} className='reg__link'>Зарегистрироваться</button>
                        <button onClick={()=>router(ATMS)} className='reg__link'>Ближайшие банкоматы</button>
                    </div>
                </div>
            }
            {state === 'Confirm' &&
                <EmailConfirm code={code} setCode={setCode} confirm={confirm} error={error}/>}
        </>
    );
};

export default observer(Auth);
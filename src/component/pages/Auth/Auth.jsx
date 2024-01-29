import React, {useEffect, useState} from 'react';
import '../../styles/Common.css'
import './Auth.css'
import {useNavigate} from "react-router-dom";
import {ATMS} from "../../../utils/consts";
import {observer} from "mobx-react-lite";
import UserStore from "../../../store/UserStore";
import '../../UI/confirmCodeInput.css'
import EmailConfirm from "../../reUsePages/EmailConfirm";
import Loading from "../../reUsePages/Loading";

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
            setState('Load')
           await SiqnIn(log, pas)

        }catch (e)
        {
            setState('SignIn')
            console.log(e)
        }


    }
    const confirm= async (e)=>{
        e.preventDefault()
        try {
            setState('Load')
            await ConfirmLogin(code)
            setState('Confirm')
        }catch (e){
            console.log(e)
            setState('SignIn')
        }



    }
    return (
        <>
            {state ==='Load' &&
                <div className='reg__modal'><Loading/></div>
            }
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
                <EmailConfirm code={code}
                              setCode={setCode}
                              state={'SignIn'}
                              setState={setState}
                              confirm={confirm}
                              request={siqnIn}
                              error={AuthError}/>
            }
        </>
    );
};

export default observer(Auth);
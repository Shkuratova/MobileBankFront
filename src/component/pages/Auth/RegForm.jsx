import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import AuthService from "../../../service/AuthService";
import PersonStore from "../../../store/UserStore";
import Input from "../../UI/defaultUI/Inputs/Input";

const RegForm = () => {
    const{isAuth, SiqnIn, setAuth,   ConfirmLogin} = PersonStore
    const router = useNavigate()
    const [state, setState] = useState('SignUp')

    const[pas, setPas] = useState('')
    const[re_pas, setRePas] = useState('')
    const [log, setLog] = useState('')
    const [tfa_token, setTfa] = useState('')
    const[code, setCode] = useState('')
    const [account, setAccount] = useState('')
    const[error,setError] = useState(null)
    const inital=(e)=>{

        e.preventDefault()
        setState('Reg')
    }
    const finalReg= async (e)=>{
        console.log("rrr")
        e.preventDefault()
        try {
            const response =await AuthService.registration(account, log, pas, re_pas)
            setTfa(response.data.tfa_token)
            setError(null)
            setState('RegConfirm')
        }catch (e) {
            setError(e.response.data)
        }
    }
    const RegConfirm = async (e)=> {
        e.preventDefault()
        try {
            const response = await AuthService.confirmRegistration(tfa_token, code)
            setAuth(true)
        }catch (e) {
            setError(e.response.data)
        }
    }
    return (
        <>
            {state ==='SignUp' &&
                <div className='reg__modal'>
                    <button onClick={()=>router('/')}
                            className='reg__link'>На главную</button>
                    <h1 className='head__reg'>Регистрация</h1>
                    <p>Введите номер счета</p>
                    <Input value={account} setValue={setAccount} text={"Номер счета"}/>
                    <button onClick={e=>inital(e)}
                            className="myBtn">Продолжить</button>
                </div>
            }
            {
                state==='Reg' &&
                <div className="reg__modal">
                    <button onClick={()=>router('/')}
                            className='reg__link'>На главную</button>
                    <h1 className="head__reg">Регистрация</h1>
                    <Input value={log}
                           setValue={setLog}
                           text={"Логин"}/>

                    <Input value={pas} setValue={setPas} text={"Пароль"}/>

                    {error && <span className='error'>{error}</span>}
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
                    {error && <span className="error">{error}</span>}
                    <button onClick={e=>RegConfirm(e)}
                            className='reg__button'>Продолжить</button>
                </div>
            }
        </>
    );
};

export default observer(RegForm);
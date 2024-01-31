import React, {useState} from 'react';
import Input from "../../../UI/defaultUI/Inputs/Input";
import {useNavigate} from "react-router-dom";
import AuthService from "../../../../service/AuthService";
import {EMPTY_FIELD, PASS_MATCH, PASS_PATTERN} from "../../../../consts/StringConsts";
import {observer} from "mobx-react-lite";
import UserStore from "../../../../store/UserStore";

const EnterLogin = ({ setState, account}) => {
    const router = useNavigate()
    const {setTfa} = UserStore
    const[pas, setPas] = useState('')
    const[re_pas, setRePas] = useState('')
    const [log, setLog] = useState('')
    const[errorPas,setErrorPas] = useState(null)
    const [loginError, setLoginError] = useState(null)
    const [rePasError, setRePasError] = useState(null)
    const [error, setError] = useState(null)
    const checkData = ()=>{
        let pas_er = pas?(pas.length>=8?null:PASS_PATTERN):EMPTY_FIELD
        let rePas_er =re_pas?null:EMPTY_FIELD
        let login_er = log?null:EMPTY_FIELD
        let er = (pas !== re_pas && !pas_er)?PASS_MATCH:null
        setErrorPas(pas_er)
        setLoginError(login_er)
        setRePasError(rePas_er)
        setError(er)
        if(!pas_er && !rePas_er && !login_er && !er){
            return true
        }
    }
    const finalReg= async (e)=>{
        e.preventDefault()
        if(checkData())
            try {
                const response =await AuthService.registration(account.replace(/\s/g, ''), log, pas, re_pas)
                setTfa(response.data.tfa_token)
                setError(null)
                setState('RegConfirm')
            }catch (e) {
                 setError(e.response.data.detail)
            }
    }
    return (
        <div className="reg__modal">
            <button
                onClick={()=>router('/')}
                className='reg__link'>На главную
            </button>
            <h1 className="head__reg">Регистрация</h1>
            <Input value={log}
                   setValue={setLog}
                   text={"Логин"}/>
            {loginError && <span className="error">{loginError}</span> }

            <Input
                value={pas}
                setValue={setPas}
                type={"password"}
                text={"Пароль"}/>
            {errorPas && <span className="error">{errorPas}</span>}

            <Input
                value={re_pas}
                setValue={setRePas}
                type={"password"}
                text={'Подтвердите пароль'}/>
            {rePasError && <span className="error">{rePasError}</span> }
            {error && <span className='error'>{error}</span>}
            <button onClick={(e) => finalReg(e)}
                    className="myBtn">Зарегистрироваться</button>
        </div>
    );
};

export default observer(EnterLogin);
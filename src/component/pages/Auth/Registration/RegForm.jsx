import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import AuthService from "../../../../service/AuthService";
import UserStore from "../../../../store/UserStore";
import TransferService from "../../../../service/TransferService";
import {ACCOUNT_PATTERN, EMPTY_FIELD, USER_DOESNT_EXIST} from "../../../../consts/StringConsts";
import {billFormat} from "../../../../utils/Format";
import '../Auth.css'
import '../../../styles/Common.css'
import EmailConfirm from "../../../reUsePages/EmailConfirm";
import EnterLogin from "./EnterLogin";

const RegForm = () => {
    const{isAuth, SiqnIn, setAuth,   ConfirmLogin} = UserStore
    const router = useNavigate()
    const [state, setState] = useState('SignUp')

    const [tfa_token, setTfa] = useState('')
    const[code, setCode] = useState('')
    const [account, setAccount] = useState('')
    const[error,setError] = useState(null)
    const inital= async (e)=>{
        e.preventDefault()
        let acc_er = !account?EMPTY_FIELD:(account.replace(/\s/g, '').length<20?ACCOUNT_PATTERN:null)
        setError(acc_er)
        if(acc_er)return
        try {
            const response = await TransferService.isClient(account.replace(/\s/g, ''))
            if(Boolean(response.data.has_account)){
                setState('Reg')
                setError(null)
            }else {
                setError(USER_DOESNT_EXIST)
            }
        }catch (e){
           console.log(e)
        }
    }
    // const finalReg= async (e)=>{
    //     e.preventDefault()
    //    setState('RegConfirm')
    //     // try {
    //     //     const response =await AuthService.registration(account, log, pas, re_pas)
    //     //     setTfa(response.data.tfa_token)
    //     //     setError(null)
    //     //     setState('RegConfirm')
    //     // }catch (e) {
    //     //     setError(e.response.data)
    //     // }
    // }
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
                    <br/>
                    <h1>Регистрация</h1>
                    <br/>
                    <p style={{marginRight:"auto"}}>Введите номер счета</p>
                    <input
                        value={account}
                        placeholder="Номер счета"
                        className={error ?"myInput error--input": "myInput"}
                        onChange={e => billFormat(e.target.value, setAccount)}
                    />
                    {error&& <span className="error">{error}</span>}
                    <button onClick={e=>inital(e)}
                            className="myBtn">Продолжить</button>
                </div>
            }
            {
                state==='Reg' &&
                <EnterLogin setState={setState} setTfa={setTfa} account={account}/>}

            {/*//     <div className="reg__modal">*/}
            {/*//         <button onClick={()=>router('/')}*/}
            {/*                className='reg__link'>На главную</button>*/}
            {/*        <h1 className="head__reg">Регистрация</h1>*/}
            {/*        <Input value={log}*/}
            {/*               setValue={setLog}*/}
            {/*               text={"Логин"}/>*/}

            {/*        <Input value={pas} setValue={setPas} text={"Пароль"}/>*/}

            {/*        <Input value={re_pas} setValue={setRePas} text={'Подтвердите пароль'}/>*/}
            {/*        {error && <span className='error'>{error}</span>}*/}
            {/*        <button onClick={(e) => finalReg(e)}*/}
            {/*                className="myBtn">Зарегистрироваться</button>*/}
            {/*    </div>*/}
            {/*}*/}
            {
                state === 'RegConfirm' &&
                <EmailConfirm code={code} setCode={setCode} confirm={RegConfirm} error={error}/>}
                {/*<div className='reg__modal'>*/}
                {/*    <h2>На вашу почту было выслано письмо с кодом подтверждения</h2>*/}
                {/*    <VerifyInput code={code} setCode={setCode}/>*/}
                {/*    {error && <span className="error">{error}</span>}*/}
                {/*    <button onClick={e=>RegConfirm(e)}*/}
                {/*            className='myBtn'>Продолжить</button>*/}
                {/*</div>*/}
            {/*}*/}
        </>
    );
};

export default observer(RegForm);
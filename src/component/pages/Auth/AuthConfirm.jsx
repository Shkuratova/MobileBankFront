import React, {useContext} from 'react';
import {AuthContext} from "../../../context";
import './Auth.css'
const AuthConfirm = ({setCode}) => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const confirm =()=>{
        setIsAuth(true)
    }
    return (
        <div className='reg__modal'>
                <h4 className='head__reg'>На почту Вашу было выслано письмо с кодом подтверждения</h4>
                <input className='reg__input' onChange={(e)=>setCode(e.target.value)}
                        type='text'
                        placeholder='Код подтвердждения'/>
                <button className='reg__button' onClick={confirm}>Подтвердить</button>
        </div>
    );
};

export default AuthConfirm;
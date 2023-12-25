import React, {useState} from 'react';
import '../../../styles/Common.css'
import '../LK.css'
import CardList from "../../Home/CardList";
import '../../Auth/Auth.css'
import {useNavigate} from "react-router-dom";
const ChangePassword = () => {
    const[state, setState] = useState('changePass')
    const [error, setError] = useState(false)
    const [pas, setPas] =useState('')
    const[pas1, setPas1]= useState('')
    const router = useNavigate()
    const checkPas = (e)=>{
        e.preventDefault()
        if(pas!==pas1)
            setError(true)
        else
            setState('execute')
    }
    return (
        <div className='page_chr'>
            <div className='changefield'>
                {state === 'changePass'&&
                <form onSubmit={e=>checkPas(e)}>
                <h1>Изменение Пароля</h1>
                <p className='que'>Старый пароль</p>
                <input className='cin' type={'password'}/>
                <p className='que'>Новый пароль</p>
                    <input  onChange={e => setPas(e.target.value)} className='cin' type={'password'}/>
                    <p className='que'>Подтвердите пароль</p>
                    <input onChange={e => setPas1(e.target.value)} className='cin' type={'password'}/>
                    {error && <span style={{color:"red"}}>Пароли не совпадают</span>}
                    <button className='myBtn'>Подтвердить</button>
                </form>
                }
                {state === 'execute' &&
                    <>
                        <h1 style={{marginBottom:"7%", marginTop:"10%", marginLeft:"20%"}}>Пароль успешно изменен</h1>
                        <button onClick={()=>router('/home')} style={{marginLeft:"10%"}} className='reg__button'>На главную</button>
                    </>
                }
        </div>
        </div>
    );
};

export default ChangePassword;
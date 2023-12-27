import React, {useState} from 'react';
import '../../../styles/Common.css'
import '../LK.css'
import '../../Auth/Auth.css'
import {useNavigate} from "react-router-dom";
import AccessChange from "./AccessChange";
import EmailConfirm from "../../../reUsePages/EmailConfirm";
import PersonService from "../../../../service/PersonService";

const ChangePassword = () => {
    const[state, setState] = useState('changePass')
    const [error, setError] = useState(false)
    const [pas, setPas] =useState()
    const[pas1, setPas1]= useState()
    const[tfa, setTfa] = useState()
    const router = useNavigate()
    const checkPas = async (e)=>{
        e.preventDefault()
        if(pas!=pas1) {
            setError('Пароли не совпадают')
            return
        }
        try {
            const response = await PersonService.changePas(pas, pas1)
            setState('Confirm')
            setTfa(response.data.tfa_token)
            setError(null)
            console.log(response.data)
        }catch (e) {
            setError(e.response.data)
        }
    }
    return (
        <div className='page_chr'>
                {state === 'changePass'&&
                    <div className='changefield'>
                <form onSubmit={e=>checkPas(e)}>
                <h1>Изменение Пароля</h1>
                <p className='que'>Новый пароль</p>
                    <input style={error ? {borderColor: "blueviolet"}:{borderColor:'black'}}
                           className='cin'
                           type={'password'}
                            onChange={e => setPas(e.target.value)} />
                    <p className='que'>Подтвердите пароль</p>
                    <input style={error ? {borderColor: "blueviolet"}:{borderColor:'black'}}
                            onChange={e => setPas1(e.target.value)}
                           className='cin'
                           type={'password'}/>
                    {error && <p className='error'>Пароли не совпадают</p>}
                    <button className='myBtn'>Подтвердить</button>
                </form>
                    </div>
                }
                {state === 'execute' &&
                    <AccessChange action={'Пароль успешно изменен'}/>
                }
            {state ==='Confirm'&&
                <EmailConfirm state={'execute'} tfa={tfa} setState={setState} request={PersonService.confirmChange}/>
            }
        </div>
    );
};

export default ChangePassword;
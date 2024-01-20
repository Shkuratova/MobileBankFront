import React, {useState} from 'react';
import '../../../styles/Common.css'
import '../LK.css'
import '../../Auth/Auth.css'
import {useNavigate} from "react-router-dom";
import AccessChange from "./AccessChange";
import EmailConfirm from "../../../reUsePages/EmailConfirm";
import PersonService from "../../../../service/PersonService";
import Input from "../../../UI/defaultUI/Input";

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
        <>
                {state === 'changePass'&&
                    <div className='changefield info_box'>
                <form onSubmit={e=>checkPas(e)}>
                <h1>Измененить пароль</h1>
                    <br/>
                    <Input
                        value={pas}
                        setValue={setPas}
                        text={"Новый пароль"}
                        error={error}
                    />
                    <Input
                        value={pas1}
                        setValue={setPas1}
                        text={"Подтвердите пароль"}
                        />
                    {error && <p className='error'>Пароли не совпадают</p>}
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <button className='myBtn'>Подтвердить</button>
                    </div>
                </form>
                    </div>
                }
                {state === 'execute' &&
                    <AccessChange action={'Пароль успешно изменен'}/>
                }
            {state ==='Confirm'&&
                <EmailConfirm state={'execute'} tfa={tfa} setState={setState} request={PersonService.confirmChange}/>
            }
        </>
    );
};

export default ChangePassword;
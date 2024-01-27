import React, {useState} from 'react';
import '../../../styles/Common.css'
import '../LK.css'
import EmailConfirm from "../../../reUsePages/EmailConfirm";
import AccessChange from "./AccessChange";
import PersonService from "../../../../service/PersonService";
import Input from "../../../UI/defaultUI/Inputs/Input";
import {EMPTY_FIELD} from "../../../../consts/StringConsts";

const ChangeLogin = () => {
    const [state, setState] = useState('Login')
    const [login, setLogin] = useState('')
    const[error, setError] = useState(null)
    const changeLog = async (e)=>{
        e.preventDefault()
        if(!login){
            setError(EMPTY_FIELD)
            return
        }
        try {
            const response = await PersonService.changeLogin(login)
            setState('Confirm')
            setError(null)
            console.log(response.data)
        }catch (e) {
            setError(e.response.data)
        }
        
    }
    
    return (
        <>
            {state ==='Login' &&
            <div className="changefield info_box">
                <form onSubmit={changeLog}>
                    <h1>Измененить логин</h1>
                    <br/>
                    <Input
                        value={login}
                        setValue={setLogin}
                        text={"Новый логин"}
                    />
                    {error&& <p className='error'>{error}</p>}
                    <button onClick={e=>changeLog(e)} className='myBtn'>Подтвердить</button>
                </form>
            </div>
            }
            {state ==='Confirm' &&
                <EmailConfirm state={'execute'} setState={setState}/>
            }
            {state==='execute' &&
                <AccessChange action={'Логин успешно изменен'}/>
            }
        </>
    );
};

export default ChangeLogin;
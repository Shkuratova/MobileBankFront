import React, {useState} from 'react';
import '../../../styles/Common.css'
import '../LK.css'
import EmailConfirm from "../../../reUsePages/EmailConfirm";
import AccessChange from "./AccessChange";
import PersonService from "../../../../service/PersonService";

const ChangeLogin = () => {
    const [state, setState] = useState('Login')
    const [login, setLogin] = useState('')
    const[error, setError] = useState(null)
    const changeLog = async (e)=>{
        e.preventDefault()
        if(!login){
            setError('Поле не может быть пустым')
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
        <div className='page_chr'>
            {state ==='Login' &&
            <div className="changefield">
                <form onSubmit={changeLog}>
                    <h1>Изменение Логина</h1>
                    <p className='que'>Новый логин</p>
                    <input style={error ? {borderColor: "blueviolet"}:{borderColor:'black'}}
                        className="cin"
                           value={login}
                           onChange={(e)=>setLogin(e.target.value)}
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
        </div>
    );
};

export default ChangeLogin;
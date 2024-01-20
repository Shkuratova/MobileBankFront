import React, {useState} from 'react';
import './Auth.css'
import VerifyInput from "../../UI/VerifyInput";

const AuthConfirm = () => {
    const[code, setCode] = useState('')
    const confirm =()=>{
        setIsAuth(true)
    }
    return (
        <div className='reg__modal'>
            <p className="confirmTitle">На вашу почту было выслано письмо с кодом подтверждения</p>
            <VerifyInput code={code} setCode={setCode}/>
            <button onClick={confirm}
                    className='myBtn'>Продолжить</button>
        </div>
    );
};

export default AuthConfirm;
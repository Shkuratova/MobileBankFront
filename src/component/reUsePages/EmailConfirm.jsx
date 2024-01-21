import React from 'react';
import './reUseConfirm.css'
import '../styles/Common.css'
import VerifyInput from "../UI/VerifyInput";

const EmailConfirm = ({code, setCode, confirm, error}) => {
    return (
            <div className='email__block info_box' >
                <p className="confirmTitle">На вашу почту было выслано письмо с кодом подтверждения</p>
                <VerifyInput code={code} setCode={setCode}/>
                {error && <p className="error">{error}</p> }
                <button onClick={confirm}
                        className='myBtn'>Продолжить</button>
            </div>
    );
};

export default EmailConfirm;
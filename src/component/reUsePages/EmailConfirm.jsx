import React from 'react';
import './reUseConfirm.css'
import '../styles/Common.css'
import VerifyInput from "../UI/VerifyInput";
import {EMAIL_MSG, NEXT} from "../../consts/StringConsts";

const EmailConfirm = ({code, setCode, confirm, error}) => {
    return (
            <div className='email__block info_box' >
                <p className="confirmTitle">{EMAIL_MSG}</p>
                <VerifyInput code={code} setCode={setCode}/>
                {error && <p className="error">{error}</p> }
                <button onClick={confirm}
                        className='myBtn'>{NEXT}</button>
            </div>
    );
};

export default EmailConfirm;
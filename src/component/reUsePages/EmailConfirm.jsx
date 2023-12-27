import React, {useState} from 'react';
import './reUseConfirm.css'
const EmailConfirm = ({tfa, request, setState, state}) => {
    const[code, setCode] = useState('')
    const [error, setError] = useState(null)
    console.log(tfa)
    const confirm = async ()=>{
        if(!code){
            setError('Поле не может быть пустым')
            return;
        }
        try {
            const response = await request(tfa, code)
            setState(state)
            setError(null)
        }catch (e) {
            setError(e.response.data)
        }
    }
    return (
        <div>
            <div className='email__block'>
                <h2>На вашу почту было выслано письмо с кодом подтверждения</h2>
                <input style={error && {borderColor: "blueviolet"}}
                       className='code__input'
                       placeholder='Код подтверждения'
                       value={code}
                       onChange={e=>setCode(e.target.value)}
                />
                {error && <p className='error'>{error}</p>}
                <button onClick={confirm} style={{width:"90%"}}
                        className='myBtn'>Продолжить</button>
            </div>
        </div>
    );
};

export default EmailConfirm;
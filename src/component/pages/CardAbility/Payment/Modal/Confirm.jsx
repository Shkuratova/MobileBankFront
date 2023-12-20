import React from 'react';
import '../MoneyToSomewhere.css'
import {useForm} from "react-hook-form";
const Confirm = ({status, setStatus}) => {
    const {
        handleSubmit,
        register,
        formState:{errors},
    } = useForm({mode:"onChange"});
    const commit =()=>{
        //запрос
        setStatus('access')
    }
    return (
        <div className='cardholder'>
            <form onSubmit={commit}>
                <h1>Подтверждение</h1>
                <div className='cardFrom'>
                    <h4>На почту ..@gmail.com было выслано письмо с кодом подтверждения</h4>
                    <input className={[errors.name, "cin"].join(" ")}
                           type='text'
                           placeholder='Код подтвердждения'/>
                    <button className='myBtn'>Подтвердить</button>
                </div>
            </form>
        </div>
    );
};

export default Confirm;
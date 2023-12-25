import React, {useState} from 'react';
import '../MoneyToSomewhere.css'
import {useForm} from "react-hook-form";
const Confirm = ({status, setStatus, setCode}) => {
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
                    <h4>На почту Вашу было выслано письмо с кодом подтверждения</h4>
                    <input  onChange={(e)=>setCode(e.target.value)}
                            className={[errors.name, "cin"].join(" ")}
                            type='text'
                            placeholder='Код подтвердждения'/>
                    <button className='myBtn'>Подтвердить</button>
                </div>
            </form>
        </div>
    );
};

export default Confirm;
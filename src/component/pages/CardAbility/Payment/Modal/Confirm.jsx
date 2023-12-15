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
            <form onSubmit={handleSubmit(commit)}>
                <h1>Подтверждение</h1>
                <div className='cardFrom'>
                    <h3>Введите пароль</h3>
                    <input className={[errors.name, "cin"].join(" ")}
                           type='password'
                           placeholder='Пароль...'
                           {...register("name",{
                               required:true,
                               pattern:/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                               minLength:8,
                               maxLength:20
                           })}/>
                    {errors.name?.type==="required" && <span style={{color:'red'}}>Поле не может быть пустым</span>}
                    {errors.name?.type==="pattern" && <span style={{color:'red'}}>Неверно введен пароль</span>}
                    {errors.name?.type==="minLength" && <span style={{color:'red'}}>Пароль должен содержать от 8 до 20 символов</span>}
                    {errors.name?.type==="maxLength" && <span style={{color:'red'}}>Пароль должен содержать от 8 до 20 символов</span>}
                    <button className='myBtn'>Подтвердить</button>
                </div>
            </form>
        </div>
    );
};

export default Confirm;
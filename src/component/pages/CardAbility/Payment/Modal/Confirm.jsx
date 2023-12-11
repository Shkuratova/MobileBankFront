import React from 'react';
import '../MoneyToSomewhere.css'
const Confirm = ({status, setStatus}) => {
    const commit =()=>{
        //запрос
        setStatus('access')
    }
    return (
        <div className='cardholder'>
            <form onSubmit={commit}>
                <h1>Подтверждение</h1>
                <div className='cardFrom'>
                    <h3>Введите пароль</h3>
                    <input className='cin'
                           type='password'
                           placeholder='Пароль...'/>
                    <button className='myBtn'>Подтвердить</button>
                </div>
            </form>
        </div>
    );
};

export default Confirm;
import React from 'react';
import '../../../styles/Common.css'
import '../LK.css'
import CardList from "../../Home/CardList";

const ChangePassword = () => {
    return (
        <div className='page_chr'>
            <CardList/>
            <div className='changefield'>
                <form>
                <h1>Изменение Пароля</h1>
                <p className='que'>Старый пароль</p>
                <input className='cin' type={'password'}/>
                <p className='que'>Новый пароль</p>
                    <input className='cin' type={'password'}/>
                    <button className='myBtn'>Подтвердить</button>
                </form>
        </div>
        </div>
    );
};

export default ChangePassword;
import React from 'react';
import '../../../styles/Common.css'
import '../LK.css'
import CardList from "../../Home/CardList";
const ChangeLogin = () => {
    return (
        <div className='page_chr'>
            <CardList/>
            <div className="changefield">
                <form>
                    <h1>Изменение Логина</h1>
                    <p className='que'>Новый логин</p>
                    <input className="cin"/>
                    <p className='que'>Введите пароль для подтверждения</p>
                    <input className="cin"
                            type='password'/>
                    <button className='myBtn'>Подтвердить</button>
                </form>
            </div>
        </div>
    );
};

export default ChangeLogin;
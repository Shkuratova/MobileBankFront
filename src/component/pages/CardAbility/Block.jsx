import React from 'react';
import {useParams} from "react-router-dom";
import './abil.css'
const Block = ({cardNum, visible, setVisible}) => {
   const p = useParams()
    const block = ()=>{
       //request
        setVisible(false)
    }
    return (
            <form  className="block" onSubmit={()=>block()}>
                <h2 style={{textAlign:"center"}}>Блокировка карты</h2>
                <p className='blockContent'>Вы уверены, что хотите заблокировать карту ***{cardNum}?</p>
                <input className='pas' placeholder='Пароль' required={true} type={"password"}/>
                <button className='blockBtn'>Заблокировать</button>
            </form>
    );
};

export default Block;
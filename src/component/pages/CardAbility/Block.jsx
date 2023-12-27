import React from 'react';
import {useParams} from "react-router-dom";
import './abil.css'
import '../../styles/Common.css'
const Block = ({cardNum, visible, setVisible}) => {
   const p = useParams()
    const block = ()=>{
       //request
        setVisible(false)
    }
    return (
            <form style={{marginTop:"8%"}} className="block" onSubmit={()=>block()}>
                <h2 style={{textAlign:"center"}}>Блокировка карты</h2>
                <p className='blockContent'>Вы уверены, что хотите заблокировать карту ****{cardNum.slice(-4)}?</p>
                <button className='myBtn'>Заблокировать</button>
            </form>
    );
};

export default Block;
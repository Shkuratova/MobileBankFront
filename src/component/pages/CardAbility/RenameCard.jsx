import React, {useState} from 'react';
import './abil.css'
const RenameCard = ({visible, setVisible, cardNum, setCardName}) => {
    const[inp, setInp] = useState('')
    const rename =(e)=>{
        e.preventDefault()
        setCardName(inp)
        setInp('')
        setVisible(false)
    }
   return( <form  className="block" onSubmit={rename}>
        <h2 style={{textAlign:"center"}}>Переименование карты</h2>
        <p className='blockContent'>Введите новое название для карты  ***{cardNum}?</p>
        <input onChange={(e)=>setInp(e.target.value)}
               className='pas' placeholder='Имя'/>
        <button className='blockBtn'>Изменить</button>
    </form>
   );
};

export default RenameCard;
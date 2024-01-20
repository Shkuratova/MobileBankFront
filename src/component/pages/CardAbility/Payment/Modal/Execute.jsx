import React from 'react';
import '../MoneyToSomewhere.css'
import './ExecTransfer.css'
import Description from "../../../../UI/Description";
const Execute = ({title, type, sum, from, to})=> {
    return (
        <div className="cardholder info_box">
            <h1 >{title}</h1>
            <p className="about--transfer">{type}</p>
            <br/>
            <br/>
            <h2 className="about--transfer">Подробности операции:</h2>
            <Description title={"Откуда:"} text={from}/>
            <Description title={"Куда:"} text={to}/>
            <Description title={"Сумма перевода:"} text={sum}/>
        </div>
    );
};

export default Execute;
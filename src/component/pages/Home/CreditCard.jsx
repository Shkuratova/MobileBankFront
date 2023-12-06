import React from 'react';
import './CardItem.css'
import {useNavigate} from "react-router-dom";
const CreditCard = (props) => {
    const router = useNavigate()
    return (
        <div onClick={()=>router(`/credit/${props.credit.id}`)}
            className="cardItem">
            <p className="card_type">{props.credit.creditType}</p>
            <div className="card_info">
                <p>Платеж: {props.credit.datePay}</p>
                <p className="sum">{props.credit.balance} ₽</p>
            </div>
        </div>
    );
};

export default CreditCard;
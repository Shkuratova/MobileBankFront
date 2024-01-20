import React from 'react';
import './CardItem.css'
import {useNavigate} from "react-router-dom";
import getSymbolFromCurrency from "currency-symbol-map";
const CreditCard = (props) => {
    const router = useNavigate()
    return (
        <div
            onClick={()=>router(`/credit/${props.credit.account_number}`)}
            className="cardItem">
            <p className="card_type">Кредит наличными</p>
            <div className="card_info">
                <p>****{props.credit.account_number.slice(-4)}</p>
                <p className="sum">{props.credit.balance.replace('-','')} {getSymbolFromCurrency(props.credit.currency)}</p>
            </div>
        </div>
    );
};

export default CreditCard;
import React from 'react';
import './CardList.css'
import CardItem from "./CardItem";
import CreditCard from "./CreditCard";
import BillItem from "./BillItem";
const CardList = () => {
    return (
        <div className="card_list">
            <p className="tit">Мои Карты</p>
            <div className="cardl">
            <CardItem/>
            <CardItem/>
            <CardItem/>
            </div>
            <p className="tit">Мои Счета</p>
            <div className="cardl">
                <BillItem/>
                <BillItem/>
                <BillItem/>
            </div>
            <p className="tit">Мои Кредиты</p>
            <div className="cardl">
                <CreditCard/>
            </div>
        </div>
    );
};

export default CardList;
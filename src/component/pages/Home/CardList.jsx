import React from 'react';
import './CardList.css'
import CardItem from "./CardItem";
const CardList = () => {
    return (
        <div className="card_list">
            <p className="tit">Мои Карты</p>
            <div className="cardl">
            <CardItem/>
            <CardItem/>
            <CardItem/>
            </div>
        </div>
    );
};

export default CardList;
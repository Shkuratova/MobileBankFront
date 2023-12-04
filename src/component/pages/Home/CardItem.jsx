import React from 'react';
import "./CardItem.css";
const CardItem = () => {
    return (
        <div className="cardItem">
            <p className="card_type">Дебетовая карта</p>
            <div className="card_info">
                <img src ="card.png" className="cardicon" />
                <p className="num">***123</p>
                <p className="sum">11 000, 00 ₽</p>
            </div>
        </div>
    );
};

export default CardItem;
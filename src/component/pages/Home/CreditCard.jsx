import React from 'react';
import './CardItem.css'
const CreditCard = () => {
    return (
        <div className="cardItem">
            <p className="card_type">Ипотека</p>
            <div className="card_info">
                <p>Платеж: 19.12.23</p>
                <p className="sum">5000,00 ₽</p>
            </div>
        </div>
    );
};

export default CreditCard;
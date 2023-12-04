import React from 'react';

const BillItem = () => {
    return (
        <div className="cardItem">
            <p className="card_type">Текущий счет</p>
            <div className="card_info">
                <p>***123</p>
                <p className="sum">
                    111 000, 00 ₽
                </p>
            </div>
        </div>
    );
};

export default BillItem;
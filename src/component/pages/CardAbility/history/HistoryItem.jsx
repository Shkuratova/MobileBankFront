import React from 'react';
import './history.css'
const HistoryItem = (props) => {
    return (
        <div className='hisoty__item'>
            <div className="general_info">
                <h3>{props.transaction.where}</h3>
                <p>{props.transaction.type}</p>
            </div>
            <div className='total'>
                <h3>{props.transaction.sum} Р</h3>
                <p>{props.transaction.end_transaction}</p>
            </div>
        </div>
    );
};

export default HistoryItem;
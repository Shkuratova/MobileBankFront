import React from 'react';
import './history.css'
const HistoryItem = ({transaction}) => {
    console.log(transaction)

    return (
        <div className='hisoty__item'>
            <div className="general_info">
                {transaction.description.From.full_name === transaction.description.To.full_name?
                    <h3 className='description'>Перевод между своими счетами</h3>
                    :
                    <h3 className='description'>Перевод клиенту банка</h3>
                }
                <p className='description'>Откуда: {transaction.description.From.account_number}</p>
                <p className='description'>Куда: {transaction.description.To.account_number}</p>

            </div>
            <div className='total'>
                <h3>{transaction.description.amount_money} {transaction.description.currency}</h3>
                <p className='description'>{transaction.end_transaction.replace('T', ' ').slice(0, -7)}</p>
            </div>
        </div>
    );
};

export default HistoryItem;
import React, {useState} from 'react';
import '../../../styles/Common.css'
import './MoneyToSomewhere.css'

const CardSelect = ({cards, card, onChange}) => {
    return (
        <select className='pay_select'
        value={card}
        onChange={event => onChange(event.target.value)}>
            {cards.map((c)=>
                <option key={c.card_name}
                        value={c.token_card}
                >
                    ****{c.card_name.slice(-4)} [{c.type_account==='debit'?'Дебетовая карта':'Кредитная карта'}] {c.balance}  {c.currency}
                </option>
            )}
        </select>
    );
};

export default CardSelect;
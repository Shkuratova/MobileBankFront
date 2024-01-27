import React, {useState} from 'react';
import '../../../styles/Common.css'
import './MoneyToSomewhere.css'
import getSymbolFromCurrency from "currency-symbol-map";

const CardSelect = ({cards, card, onChange}) => {
    return (
        <select className='mySelect'
        value={card}
        onChange={event => onChange(event.target.value)}>
            {cards.map((c)=>
                <option key={c.card_name}
                        value={c}
                >
                    ****{c.card_name.slice(-4)} [{c.type_account==='debit'?'Дебетовая карта':'Кредитная карта'}] {c.balance}{getSymbolFromCurrency(c.currency)}
                </option>
            )}
        </select>
    );
};

export default CardSelect;
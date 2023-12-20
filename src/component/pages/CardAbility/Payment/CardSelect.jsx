import React, {useState} from 'react';
import '../../../styles/Common.css'
import './MoneyToSomewhere.css'

const CardSelect = ({cards, card, onChange}) => {

    return (
        <select className='pay_select'
        value={card}
        onChange={event => onChange(event.target.value)}>
            {cards.map((c)=>
                <option key={c.cardNum}
                        value={c.id}
                >
                    {'****'+c.cardNum + '   [' + c.cardType +']   ' + c.balance + ' руб.'}
                </option>
            )}
        </select>
    );
};

export default CardSelect;
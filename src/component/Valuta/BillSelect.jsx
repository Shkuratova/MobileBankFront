import React from 'react';
import '../pages/CardAbility/Payment/PaymentElem.css'
import '../UI/defaultUI/defaultUI.css'
import getSymbolFromCurrency from "currency-symbol-map";

const BillSelect = ({ bills, bill, onChange}) => {
    let dict  = new Map();
    dict.set('debit', 'Текущий счет').set('credit','Кредитный счет')
    return (
        <select className='mySelect'
                value={bill}
                onChange={event => onChange(event.target.value)}>
            {bills.map((c)=>
                <option key={c.account_number}
                        value={c.account_number}
                >
                    {'****'+c.account_number.slice(-4) + '   [' + dict.get(c.type_account) +']   ' + c.balance+getSymbolFromCurrency(c.currency)}
                </option>
            )}
        </select>
    );
};

export default BillSelect;
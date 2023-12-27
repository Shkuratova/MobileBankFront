import React from 'react';
import '../pages/CardAbility/Payment/PaymentElem.css'

const BillSelect = ({ bills, bill, onChange}) => {
    let dict  = new Map();
    dict.set('debit', 'Текущий счет').set('credit','Кредитный счет')
    return (
        <select className='pay_select'
                value={bill}
                onChange={event => onChange(event.target.value)}>
            {bills.map((c)=>
                <option key={c.account_number}
                        value={c.account_number}
                >
                    {'****'+c.account_number.slice(-4) + '   [' + dict.get(c.type_account) +']   ' + c.balance + ' ' + c.currency}
                </option>
            )}
        </select>
    );
};

export default BillSelect;
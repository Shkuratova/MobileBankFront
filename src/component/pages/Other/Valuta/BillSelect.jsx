import React from 'react';
import '../../CardAbility/Payment/PaymentElem.css'
const BillSelect = ({bills, bill, onChange}) => {
    return (
        <select className='pay_select'
                value={bill}
                onChange={event => onChange(event.target.value)}>
            {bills.map((c)=>
                <option key={c.billNum}
                        value={c.id}
                >
                    {'****'+c.billNum + '   [' + c.billType +']   ' + c.balance + ' руб.'}
                </option>
            )}
        </select>
    );
};

export default BillSelect;
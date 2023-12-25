import React from 'react';
import {useNavigate} from "react-router-dom";

const BillItem = (props) => {
    const router = useNavigate()
    return (
        <div
            onClick={()=>router(`/bill/${props.bill.account_number}`)}
            className="cardItem">
            <p className="card_type">Текущий счет</p>
            <div className="card_info">
                <p>***{(props.bill.account_number).slice(-4)}</p>
                <p className="sum">
                    {(props.bill.balance)} {props.bill.currency}
                </p>
            </div>
        </div>
    );
};

export default BillItem;
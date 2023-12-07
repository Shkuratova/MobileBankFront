import React from 'react';
import {useNavigate} from "react-router-dom";

const BillItem = (props) => {
    const router = useNavigate()
    return (
        <div
            onClick={()=>router(`/bill/${props.bill.id}`)}
            className="cardItem">
            <p className="card_type">{props.bill.billType}</p>
            <div className="card_info">
                <p>***{props.bill.billNum}</p>
                <p className="sum">
                    {props.bill.balance} ₽
                </p>
            </div>
        </div>
    );
};

export default BillItem;
import React, {useState} from 'react';
import '../../../styles/Common.css'
import CardList from "../../Home/CardList";
import CardSelect from "../../CardAbility/Payment/CardSelect";
import BillSelect from "./BillSelect";
const BuyValute = () => {
    const [bills, setBills] = useState([
        {id:1, billType:'Текущий счет', billNum:'458', balance:'25000,45'},
        {id:2, billType:'Текущий счет', billNum:'485', balance:'280,05'}
    ])
    const[bill, setBill] = useState(bills[0].id)
    const [valutaBill, setValutaBills] = useState([
        {id:1, billType:'Счет в долларах', billNum:'659', balance:'125,21'},
        {id:2, billType:'Cчет в долларах', billNum:'451', balance:'288,96'}
    ])
    return (
        <div className="page_chr">
            <CardList/>
            <div className='buy_val'>
                <h1>Покупка валюты</h1>
                <BillSelect bills={bills} bill={bill} onChange={value=>setBill(value)}/>
            </div>
        </div>
    );
};

export default BuyValute;
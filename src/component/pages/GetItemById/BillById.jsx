import React, {useState} from 'react';
import CardList from "../Home/CardList";
import '../../styles/Common.css'
import Action from "../../reUse/Action";
const BillById = () => {
    const [bill, setBill] = useState(
        {id:1, billType:'Текущий счет', billNum:'458', balance:'25000,45'}
    )
    return (
        <div className="page_chr">
            <CardList/>
            <div className="infor">
                <div className="descr">
                    <h1  className="descr_txt">WorldSkills Счет</h1>
                    <p className="descr_txt spec">***{bill.billNum} {bill.billType}</p>
                    <h2 className="bl">{bill.balance} ₽</h2>
                    <p className="descr_txt spec">Счет в рубляx</p>
                </div>
                <div className="abil">
                    <p className="descr_txt spec">Действия</p>
                    <Action
                        path = {'/bill/history/'+bill.id}
                        img={'/images/history.png'}
                        height={'50'}
                        width={'50'}
                        name = {'История операций'}/>
                </div>
            </div>
        </div>
            );
};

export default BillById;
import React, {useState} from 'react';
import CardList from "../Home/CardList";
import Action from "../../reUse/Action";

const CreditById = () => {
    const [credit, setCredit] = useState(
        {id:1, creditType:'Кредит наличными',creditNum:'458', balance:'25000,45',
        payPerMonth:'3960,00', datePay:'19.12.23'}
    )
    return (
        <div className="page_chr">
            <CardList/>
            <div className="infor">
                <div className="descr">
                    <h1  className="descr_txt">WorldSkills  {credit.creditType}</h1>
                    <p className="descr_txt spec">***{credit.creditNum}</p>
                    <h2 className="bl">{credit.balance} ₽</h2>
                    <h3 className="descr_txt">Ближайший платеж: {credit.datePay}</h3>
                    <h2 className="bl">{credit.payPerMonth} ₽</h2>
                </div>
                {/*<div className="abil">*/}
                {/*    <p className="descr_txt spec">Действия</p>*/}
                {/*    <Action*/}
                {/*        path = {'/card/history/' +credit.id}*/}
                {/*        img={'/images/history.png'}*/}
                {/*        height={'50'}*/}
                {/*        width={'50'}*/}
                {/*        name = {'История операций'}/>*/}
                {/*    <Action*/}
                {/*        path = {'/payment'}*/}
                {/*        img={'/images/pay.png'}*/}
                {/*        height={'50'}*/}
                {/*        width={'50'}*/}
                {/*        name = {'Оплатить'}/>*/}
                {/*    <Action*/}
                {/*        path={'/credit/info/' + credit.id}*/}
                {/*        img={'/images/info.png'}*/}
                {/*        height={'50'}*/}
                {/*        width={'50'}*/}
                {/*        name = {'Детальная информация'}/>*/}
                {/*</div>*/}

            </div>
        </div>

    );
};

export default CreditById;
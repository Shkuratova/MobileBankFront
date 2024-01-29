import React from 'react';
import {useCookies} from "react-cookie";
import getSymbolFromCurrency from "currency-symbol-map";
import QuickPayItem from "./QuickPayItem";

const QuickPay = () => {
    const [cookie] = useCookies(['hist'])
    console.log(cookie.hist)
    return (
        <div className="quick--list info_box">
            <h2>Быстрая оплата</h2>
            {!cookie.hist || !cookie.hist.length ?
            <p>
                После оплаты услуг здесь появятся карточки быстрой оплаты
            </p>
                :
                <>
                    {cookie.hist.map((c)=>
                        <QuickPayItem pay={c} key = {c.description}/>
                    )}
                </>
            }
        </div>
    );
};

export default QuickPay;
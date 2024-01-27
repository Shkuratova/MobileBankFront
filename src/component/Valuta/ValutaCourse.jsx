import React, {useEffect, useState} from 'react';
import axios from "axios";
import '../styles/Common.css'
import './valute.css'
import ValuteItem from "./ValuteItem";
import {observer} from "mobx-react-lite";
import ValutaStore from "../../store/CurrencyStore";

const ValutaCourse = () => {
    const {course, isLoad, getCourse} = ValutaStore

    useEffect(() => {
        getCourse()
    }, []);

    return (
        <>
            {isLoad?
                <div className="info_box val_list" style={{flexDirection:"row"}}>
                    <div className="load-line chet"></div>
                    <div className="load-line nechet"></div>
                    <div className="load-line third"></div>
                </div>
               :
                <div className='val_list'>
                    {Object.values(course).map((c) =>
                        <ValuteItem key={c.CharCode} CharCode={c.CharCode} Nominal={c.Nominal}
                         PurchasePrice={c.PurchasePrice} Name={c.Name} SalePrice={c.SalePrice}/>
                    )}
                </div>
                }
            </>
    );
};

export default observer(ValutaCourse);
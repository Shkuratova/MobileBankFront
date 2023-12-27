import React, {useEffect, useState} from 'react';
import axios from "axios";
import '../styles/Common.css'
import './valute.css'
import ValuteItem from "./ValuteItem";
import {observer} from "mobx-react-lite";
import ValutaStore from "../../store/ValutaStore";

const ValutaCourse = () => {
    const {course, isLoad, getCourse} = ValutaStore

    useEffect(() => {
        getCourse()
    }, []);

    return (
        <div className='page_chr'>
            {isLoad?
                <h1>Загрузка...</h1>
                :<div className='val_list'>
                    {Object.values(course).map((c) =>
                        <ValuteItem key={c.CharCode} CharCode={c.CharCode} Nominal={c.Nominal}
                         PurchasePrice={c.PurchasePrice} Name={c.Name} SalePrice={c.SalePrice}/>
                    )}
                </div>
                }
            </div>
    );
};

export default observer(ValutaCourse);
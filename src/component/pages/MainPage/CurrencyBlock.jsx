import React from 'react';
import {observer} from "mobx-react-lite";
import './main.css'
import '../../styles/Common.css'
const CurrencyBlock = () => {
    return (
        <div className="valute--main">
            <h2>Валюта</h2>
            <div>
                <div className="row-direct valute--title">
                    <p>Валюта</p>

                    <p>Купить</p>
                    <p>Продать</p>

                </div>

            </div>
        </div>
    );
};

export default observer(CurrencyBlock)
;
import React from 'react';
import CurrencyInput from "react-currency-input-field";
import '../defaultUI.css'
import getSymbolFromCurrency from "currency-symbol-map";
const CurInput = ({sum, setSum, error, text}) => {
    return (
        <CurrencyInput
            className={error?"myInput error--input":"myInput"}
            placeholder={(text !== null) ? text : "Сумма платежа"}
            decimalsLimit={2}
            allowDecimals={true}
            defaultValue={sum}
            decimalSeparator={'.'}
            allowNegativeValue={false}
             maxLength={9}
            onValueChange={(e) => setSum(e)}
        />
    );
};

export default CurInput;
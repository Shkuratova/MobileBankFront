import React from 'react';
import CurrencyInput from "react-currency-input-field";

const CurInput = ({sum, setSum, error, text}) => {
    return (
        <CurrencyInput
            className={error?"myInput error--input":"myInput"}
                       placeholder={(text!==null)?text:"Сумма платежа"}
                       decimalsLimit={2}
                       required={true}
                       defaultValue={sum}
                       onValueChange={(e)=>setSum(e)}
        />
    );
};

export default CurInput;
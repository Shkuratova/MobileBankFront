import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import BillSelect from "../BillSelect";
import CurrencyInput from "react-currency-input-field";
import {useNavigate, useParams} from "react-router-dom";
import '../../styles/Common.css'
import '../valute.css'
import ValutaStore from "../../../store/CurrencyStore";

const BuyValuta = ({valBills, sellBills, valBill,bill, total, setTotal, setBill, error,setValBill, sum, setSum, transact}) => {

    const{val, course, isLoad,getCourse, setVal} = ValutaStore
    const p = useParams()
    const s = useNavigate()
    console.log(p.charcode)
    // useEffect(() => {
    //     getCourse()
    // }, []);
    useEffect(() => {
        if(!isLoad)
            setVal(course[p.charcode])
    }, [isLoad]);
    console.log(val)
    useEffect(() => {
        setTotal(Number(val.PurchasePrice*sum).toFixed(2))
    }, [sum]);


    return (
       <>
            <div className='vall_bill'>
                <p>Выберите счет для списания</p>
                {sellBills.length &&
                    <BillSelect bills={sellBills} bill={bill} onChange={value => setBill(value)}/>}
            </div>
            {valBills.length ?
                <>
                    <div className='vall_bill'>
                        <p>Выберите счет для покупки</p>
                        {valBills.length &&
                            <BillSelect bills={valBills} bill={valBill} onChange={value => setValBill(value)}/>}
                    </div>
                    <div className='vall_bill'>
                        <CurrencyInput
                            className='myInput'
                            placeholder='Количество'
                            allowDecimals={false}
                            maxLength={7}
                            defaultValue={sum}
                            allowNegativeValue={false}
                            onValueChange={(e) => setSum(e)}
                        />
                        {total>0?
                        <h4>Итого к оплате:{total} </h4>:<></>}
                        <button onClick={(e) => transact(e)}
                                className='myBtn'>Обменять
                        </button>
                    </div>
                    </>:
                    <div className='vall_bill'>
                        <p>У вас нет подходящего счета для покупки</p>
                        <button className='open_bill'
                                onClick={() => s('/new_bill')}>Открыть счет
                        </button>
                    </div>}

                </>
                );
};

export default observer(BuyValuta);
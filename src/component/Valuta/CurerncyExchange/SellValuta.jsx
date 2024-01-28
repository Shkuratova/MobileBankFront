import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import BillSelect from "../BillSelect";
import CurrencyInput from "react-currency-input-field";
import '../../styles/Common.css'
import ValutaStore from "../../../store/CurrencyStore";
import {useParams} from "react-router-dom";
import CurInput from "../../UI/defaultUI/Inputs/CurInput";
const SellValuta = ({valBills, setValBill, valBill,total, setTotal, sellBills, bill, setBill, sum, setSum, transact }) => {
    const{val, course, isLoad,getCourse, setVal} = ValutaStore
    const p = useParams()
    const [currency, setCurrency] = useState()
    useEffect(() => {
        if(course.length === 0)
            getCourse()
    }, []);
    useEffect(() => {
        if(!isLoad){
            if(val)
                setCurrency(course[val])
            else
                setCurrency(course[p.charcode])
        }

    }, [isLoad, val]);
    console.log(val.SalePrice)
    useEffect(() => {
        if(currency && sum)
            setTotal(Number((currency.SalePrice/currency.Nominal)*sum.replace(',','.')).toFixed(2))
    }, [sum, currency]);
    return (
        <>
            {(valBills.length && valBills.filter((v)=>v.balance !=0).length)?<>
                    <div className='vall_bill'>
                        <p>Выберите счет для продажи</p>
                        {valBills.length &&
                            <BillSelect bills={valBills} bill={valBill} onChange={value => setValBill(value)}/>}
                    </div>
                    <div className='vall_bill'>
                        <p>Выберите счет для перевода</p>
                        {sellBills.length &&
                            <>
                                <BillSelect bills={sellBills} bill={bill} onChange={value => setBill(value)}/>
                                <div className='vall_bill'>
                                   <CurInput sum={sum} setSum={setSum} text={'Количество'}/>
                                    {total>0? <h4>Сумма зачисления:{total} </h4>:<></>}
                                    <button onClick={transact}
                                            className='myBtn'>Обменять</button>
                                </div>
                            </>}
                    </div>
                </>:
                <div className='vall_bill'>
                    <p>У вас нет подходящего счета для продажи</p>
                </div>}


        </>
    );
};

export default observer(SellValuta);
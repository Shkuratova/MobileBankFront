import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import BillSelect from "../BillSelect";
import CurrencyInput from "react-currency-input-field";
import '../../styles/Common.css'
import ValutaStore from "../../../store/CurrencyStore";
import {useParams} from "react-router-dom";
const SellValuta = ({valBills, setValBill, valBill,total, setTotal, sellBills, bill, setBill, sum, setSum, transact }) => {
    const{val, course, isLoad,getCourse, setVal} = ValutaStore
    const p = useParams()
    // useEffect(() => {
    //     getCourse()
    // }, []);
    useEffect(() => {
        if(!isLoad)
            setVal(course[p.charcode])
    }, [isLoad]);
    console.log(val.SalePrice)
    useEffect(() => {
        setTotal(Number(val.SalePrice*sum).toFixed(2))
    }, [sum]);
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
                                    <CurrencyInput
                                        className='myInput'
                                        placeholder='Количество'
                                        allowDecimals={false}
                                        defaultValue={sum}
                                        maxLength={7}
                                        allowNegativeValue={false}
                                        onValueChange={(e) => setSum(e)}
                                    />
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
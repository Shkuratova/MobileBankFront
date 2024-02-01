import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import BillSelect from "../BillSelect";
import CurrencyInput from "react-currency-input-field";
import {useNavigate, useParams} from "react-router-dom";
import '../../styles/Common.css'
import '../valute.css'
import ValutaStore from "../../../store/CurrencyStore";
import CurInput from "../../UI/defaultUI/Inputs/CurInput";
import TransferService from "../../../service/TransferService";
import {SUM_ERROR} from "../../../consts/StringConsts";

const BuyValuta = ({valBills, sellBills, valBill,bill,   setTfa, setState, setBill, setValBill}) => {

    const{val, course, isLoad,setTotalSum,setFrom, setBuy,getCourse} = ValutaStore
    const p = useParams()
    const s = useNavigate()
    const [sum, setSum] = useState(0)
    const [total, setTotal] = useState(0)
    const [currency, setCurrency] = useState(null)
    const [error, setError] = useState(null)

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
    useEffect(() => {
       if(currency && sum)
        setTotal(Number((currency.PurchasePrice/currency.Nominal)*sum.replace(',','.')).toFixed(2))
    }, [sum, currency]);
    const Transact = async (e)=>{
        e.preventDefault()
        if(sum <= 0){
            setError(SUM_ERROR)
            return
        }
        setTotalSum(sum)
        setFrom(bill)
        setBuy(total)
        const descr ='Покупка валюты'
        try {
            const response = await TransferService.Transfer(total, bill, valBill, descr)
            setError(null)
            setTfa(response.data.tfa_token)
            setState('Confirm')
        }catch (e) {
            setError(e.response.data.detail)
        }
    }

    const onClickHandler = ()=>{
        localStorage.setItem('currency', val)
        s('/new_bill')
    }
    return (
       <>
            <div className='vall_bill'>
                <p>Выберите счет для списания</p>
                {sellBills.length ?
                    <BillSelect bills={sellBills} bill={bill} onChange={value => setBill(value)}/>
                    :
                    <p>У вас нет счета в рублях</p>
                }
            </div>
            {valBills.length ?
                <>
                    <div className='vall_bill'>
                        <p>Выберите счет для покупки</p>
                        {valBills.length &&
                            <BillSelect bills={valBills} bill={valBill} onChange={value => setValBill(value)}/>}
                    </div>
                    <div className='vall_bill'>
                        <CurInput sum={sum} setSum={setSum}  error={error} text={'Количество'}/>

                        {(total>0 &&!error) &&
                        <h4>Итого к оплате:{total} </h4>}
                        {error && <span className="error">{error}</span>}
                        <button onClick={Transact}
                                className='myBtn'>Обменять
                        </button>
                    </div>
                    </>:
                    <div className='vall_bill'>
                        <p>У вас нет подходящего счета для покупки</p>
                        <button className='open_bill'
                                onClick={onClickHandler}>Открыть счет
                        </button>
                    </div>}

                </>
                );
};

export default observer(BuyValuta);
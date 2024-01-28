import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import BillSelect from "../BillSelect";
import CurrencyInput from "react-currency-input-field";
import {useNavigate, useParams} from "react-router-dom";
import '../../styles/Common.css'
import '../valute.css'
import ValutaStore from "../../../store/CurrencyStore";
import CurInput from "../../UI/defaultUI/Inputs/CurInput";

const BuyValuta = ({valBills, sellBills, valBill,bill, total, setTotal, setBill, error,setValBill, sum, setSum, transact}) => {

    const{val, course, isLoad,getCourse} = ValutaStore
    const p = useParams()
    const s = useNavigate()
    const [currency, setCurrency] = useState(null)
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

    const onClickHandler = ()=>{
        localStorage.setItem('currency', val)
        s('/new_bill')
    }
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
                        <CurInput sum={sum} setSum={setSum} text={'Количество'}/>

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
                                onClick={onClickHandler}>Открыть счет
                        </button>
                    </div>}

                </>
                );
};

export default observer(BuyValuta);
import React, {useEffect, useState} from 'react';
import '../../styles/Common.css'
import AccountStore from "../../../store/AccountStore";
import {useParams} from "react-router-dom";
import '../valute.css'
import {observer} from "mobx-react-lite";
import TransferService from "../../../service/TransferService";
import EmailConfirm from "../../reUsePages/EmailConfirm";
import BuyValuta from "./BuyValuta";
import SellValuta from "./SellValuta";
import SelectAction from "../../UI/SelectAction";

const ExchangeValute = () => {
    const{bills} = AccountStore
    const [bill, setBill] = useState('')
    const [valBill, setValBill] = useState('')
    const valuta = useParams()
    const[valBills, setValBills] = useState([{account_number:''}])
    const[sellBills, setSellBills] = useState([{account_number:''}])
    const[flag, setFlag] = useState(true)
    const[total, setTotal] = useState(0)
    const[sum, setSum] = useState(0)
    const [code,setCode] = useState('')
    const [state, setState] = useState('Valuta')
    const [tfa ,setTfa] = useState()
    const [error, setError] = useState(null)
    useEffect(() => {
            setValBills(bills.filter((f)=>f.currency === valuta.charcode))
            setSellBills(bills.filter((f)=>f.currency !== valuta.charcode && f.currency ==='RUB'))
    }, [bills]);
    useEffect(() => {
        if(valBills.length)
             setValBill(valBills[0].account_number)
        if(sellBills.length)
            setBill(sellBills[0].account_number)
    }, [valBills, sellBills]);

    const transact = async (e)=>{
        e.preventDefault()
        const from = flag?bill:valBill
        const to = flag?valBill:bill
        const amount = flag?total:sum
        const descr = flag?'Покупка валюты':'Продажа валюты'
        console.log(from, to)
        try {
            const response = await TransferService.Transfer(amount, from, to, descr)
            console.log(response.data)
            setError(null)
            setTfa(response.data.tfa_token)
            setState('Confirm')
        }catch (e) {
                setError(e.response.data)
        }
    }
    const Confirm = async (e)=>{
        e.preventDefault()
        try {
            await TransferService.confirmTransfer(tfa, code)
            setError(null)
            setState('success')
        } catch (e) {
            setError(e.response.data)
        }
    }

    return (
        <>
            {state === 'Valuta' &&
            <div className='buy_val'>
                <h1>Обмен валюты</h1>
             <SelectAction flag={flag} setFlag={setFlag} case1={'Покупка'} case2={'Продажа'}/>
                {flag?
                <BuyValuta valBills={valBills} sellBills={sellBills} bill={bill}
                           valBill={valBill} setBill={setBill} setTotal={setTotal} total={total}
                           setValBill={setValBill} sum={sum} setSum={setSum} transact={transact}/>
                :
                   <SellValuta sellBills={sellBills} bill={bill} setTotal={setTotal} total={total}
                               valBill={valBill} setBill={setBill} setValBill={setValBill} sum={sum}
                               setSum={setSum} transact={transact} valBills={valBills}/>
                }
            </div>
            }
            {state ==='Confirm' &&
                <EmailConfirm code={code} setCode={setCode} confirm={Confirm} />}
            {state === 'success' &&
                <div className='buy_val'>
                    <h1>Успешно</h1>
                </div>
            }
        </>
    );
};

export default observer(ExchangeValute);
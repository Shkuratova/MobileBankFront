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
import {valutaCharCode} from "../../../utils/consts";
import CurrencyStore from "../../../store/CurrencyStore";

const ExchangeValute = () => {

    const {getCourse, val ,isLoad, course, setVal} = CurrencyStore
    const{bills} = AccountStore
    const p = useParams()
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
    const[valute, setValute] = useState()
    const [error, setError] = useState(null)
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
        if(valute){
            setVal(valute)
        }
    }, [valute]);
    useEffect(()=>{
        setValute(valuta.charcode)
    }, [])
    useEffect(() => {
            setValBills(bills.filter((f)=>f.currency === valute))
            setSellBills(bills.filter((f)=>f.currency !== valute && f.currency ==='RUB'))
    }, [bills, valute]);
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
console.log(111,currency)
    return (
                <>
                    {state === 'Valuta' &&
                        <div className='buy_val info_box'>
                            <h1>Обмен валюты</h1>


                            <SelectAction flag={flag} setFlag={setFlag} case1={'Покупка'} case2={'Продажа'}/>
                            <p style={{marginTop: "4%"}}>Валюта</p>
                            <select className='mySelect'
                                    value={valute}
                                    onChange={e => setValute(e.target.value)}>
                                {valutaCharCode.map((t) =>
                                    <option key={t.CharCode} value={t.CharCode}> {t.Name}</option>
                                )}
                            </select>
                            {currency &&
                            <p>1 {val} = {flag ? currency.PurchasePrice :currency.SalePrice} RUB</p>
                            }
                            <br/>
                            {flag ?
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
                    {state === 'Confirm' &&
                        <EmailConfirm code={code} setCode={setCode} confirm={Confirm}/>}
                    {state === 'success' &&
                        <div className='buy_val'>
                            <h1>Успешно</h1>
                        </div>
                    }
                </>

    );
};

export default observer(ExchangeValute);
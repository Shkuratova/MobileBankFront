import React, {useEffect, useState} from 'react';
import '../../../styles/Common.css'
import './MoneyToSomewhere.css'
import './PaymentElem.css'
import CardSelect from "./CardSelect";
import BillSelect from "../../../Valuta/BillSelect";
import {observer} from "mobx-react-lite";
import AccountStore from "../../../../store/AccountStore";
import CardStore from "../../../../store/CardStore";
import SelectAction from "../../../UI/SelectAction";
import TransferService from "../../../../service/TransferService";
import Input from "../../../UI/defaultUI/Inputs/Input";
import CurInput from "../../../UI/defaultUI/Inputs/CurInput";
import EmailConfirm from "../../../reUsePages/EmailConfirm";
import {EMPTY_FIELD, SUM_ERROR} from "../../../../consts/StringConsts";
import {billFormat} from "../../../../utils/Format";
import Execute from "./Modal/Execute";
import getSymbolFromCurrency from "currency-symbol-map";

const PayService = observer(() => {
    const {bills, getPayAccount} = AccountStore;
    const {cards, getPayCard} =CardStore;
    useEffect(()=>{
        if(cards.length !== 0)
            setCard(getPayCard()[0])
    }, [cards])
    useEffect(()=>{
        if(bills.length !== 0)
            setBill(getPayAccount()[0])
    }, [bills])
    const [bill, setBill] = useState(bills[0].account_number)
    const [state, setState] = useState('service')
    const[flag, setFlag] = useState(true)
    const [card, setCard] = useState('')
    const[sum, setSum] = useState('')
    const[where, setWhere] = useState('')
    const[description, setDescription] = useState('')
    const [tfa, setTfa] =useState('')
    const [descError, setDescError] = useState(null)
    const [whereError, setWhereError] = useState(null)
    const [sumError, setSumError] = useState(null)
    const [error, setError] = useState(null)
    const[code, setCode] = useState('')
    const [check, setCheck] = useState(false)
    useEffect(()=>{
        if(check) {
            setSumError(sum ? null : EMPTY_FIELD)
            setSumError(sum > 0 ? null : SUM_ERROR)
            setDescError(description ? null : EMPTY_FIELD)
            setWhereError(where ? null : EMPTY_FIELD)
        }
    },[check, sum, description, where])
    const isValid = ()=>{
        let sum_error = sum ? null : EMPTY_FIELD
        let sum_er = sum > 0 ? null : SUM_ERROR
        let desc_error = description ? null : EMPTY_FIELD
        let where_error =where ? null : EMPTY_FIELD
        let where_len = where.length === 24?null:"Неверно введен счет"
        setSumError(sum_error)
        setSumError(sum_er)
        setDescError(desc_error)
        setWhereError(where_error)
        setWhereError(where_len)
        return !sum_error && !sum_er && !where_error && !sum_er && !where_len
    }
    const setAccount =(b)=>{billFormat(b, setWhere)}
    const sendDuty = async (e)=> {
        e.preventDefault()
        setCheck(true)
        if(isValid()) {
            try {
                var account = flag ? card.account_number : bill
                var cardFrom = flag ? card.token_card : ""
                const response = await TransferService.Transfer(sum.replace(',', '.'),
                    account, where.replace(/\s/g, ''), description, cardFrom)
                console.log(response.data)
                setTfa(response.data.tfa_token)
                setState('confirmation')
                setError(null)
            } catch (e) {
                let er = e.response.data
                setWhereError(er.account_recv? er.account_recv:null)
                setSumError(er)
                console.log(e)
            }
        }
    }
    const Confirm =async (e)=>{
        e.preventDefault()
        if(!code){
            setError(EMPTY_FIELD)
            return
        }
        try {
            const response = await TransferService.confirmTransfer(tfa, code)
            setState('access')
            console.log(response.data)
        }catch (e) {
            setError(e.response.data)
            console.log(e)
        }
    }

    return (
        <>
            {state==='service' &&
                <div className='cardholder info_box'>
                    <h1>Оплатить</h1>
                    <SelectAction flag={flag} setFlag={setFlag} case1={'Списать с карты'} case2={'Списать со счета'}/>
                    <form onSubmit={sendDuty} className='service'>
                        {flag?
                                <CardSelect cards={getPayCard()} card={card} onChange={value=>setCard(value)}/>
                            :
                            <BillSelect bills={getPayAccount()} bill={bill} onChange={value => setBill(value)}/>
                        }
                        <h4 className='pay_header'>Назначение платежа</h4>
                        <Input
                            value={description}
                            setValue={setDescription}
                            text={"Описание платежа"}
                            error={descError}
                        />
                        {descError && <p className="error">{descError}</p>}
                        <h4 className='pay_header'>Номер счета для оплаты</h4>
                        <Input
                            value={where}
                            setValue={setAccount}
                            text={"Счет"}
                            error={whereError}
                        />
                        {whereError && <p className="error">{whereError}</p>}
                        <h4 className='pay_header'>Сумма перевода</h4>
                           <CurInput
                               sum={sum}
                               text={'0'}
                               setSum={setSum}
                               error={sumError}/>
                        {sumError && <p className="error">{sumError}</p>}
                        {error && <p className="error">{error}</p>}
                        <button className='myBtn'>Продолжить</button>
                    </form>
                </div>
            }
            {state ==='confirmation'&&
                    <EmailConfirm confirm={Confirm} error={error} code={code} setCode={setCode} />
            }
            {state ==='access' &&
                <Execute
                    title={"Успешно"}
                    type={description}
                    from={flag?card.card_name:bill}
                    to={bill.replace(/\s/g, '')}
                    sum={sum + getSymbolFromCurrency("RUB")}/>
            }
        </>
    );
});

export default PayService;
import React, {useState} from 'react';
import '../../../styles/Common.css'
import './MoneyToSomewhere.css'
import CurrencyInput from "react-currency-input-field";
import './PaymentElem.css'
import Confirm from "./Modal/Confirm";
import CardSelect from "./CardSelect";
import BillSelect from "../../../Valuta/BillSelect";
import {observer} from "mobx-react-lite";
import AccountStore from "../../../../store/AccountStore";
import CardStore from "../../../../store/CardStore";
import SelectAction from "../../../UI/SelectAction";
import TransferService from "../../../../service/TransferService";
import Input from "../../../UI/defaultUI/Input";
import CurInput from "../../../UI/defaultUI/CurInput";

const PayService = observer(() => {
    const {bills} = AccountStore;
    const {cards} =CardStore;

    const [bill, setBill] = useState(bills[0].account_number)
    const [state, setState] = useState('service')
    const[flag, setFlag] = useState(true)
    const [card, setCard] = useState('')
    const[sum, setSum] = useState('')
    const[where, setWhere] = useState('')

    const [descError, setDescError] = useState(null)
    const [whereError, setWhereError] = useState(null)
    const [sumError, setSumError] = useState(null)
    const sendDuty = async ()=>{
        if(!flag)
        {
        try {
            const response = await TransferService.Transfer(sum, )
        }catch (e){
        }
        }
        else {
            try {

            }catch (e) {

            }
        }
        setState('confirmation')
    }
    const[description, setDescription] = useState('')

    return (
        <>
            {state==='service' &&
                <div className='cardholder info_box'>
                    <h1>Оплатить</h1>
                    <SelectAction flag={flag} setFlag={setFlag} case1={'Списать с карты'} case2={'Списать со счета'}/>
                    <form onSubmit={sendDuty} className='service'>
                        {flag?
                                <CardSelect cards={cards} card={card} onChange={value=>setCard(value)}/>
                            :
                            <BillSelect bills={bills} bill={bill} onChange={value => setBill(value)}/>
                        }
                        <h4 className='pay_header'>Назначение платежа</h4>
                        <Input
                            value={description}
                            setValue={setDescription}
                            text={"Описание платежа"}
                            error={descError}
                        />
                        <h4 className='pay_header'>Номер счета для оплаты</h4>
                        <Input
                            value={where}
                            setValue={setWhere}
                            text={"Счет"}
                            error={whereError}
                        />
                        <h4 className='pay_header'>Сумма перевода</h4>
                           <CurInput
                               sum={sum}
                               text={'0'}
                               setSum={setSum}
                               error={sumError}/>
                        <button className='myBtn'>Продолжить</button>
                    </form>
                </div>
            }
            {state ==='confirmation'&&
                    <Confirm status={state} setStatus={setState}/>
            }
            {state ==='access' &&

                <h1>Оплачено</h1>
            }
        </>
    );
});

export default PayService;
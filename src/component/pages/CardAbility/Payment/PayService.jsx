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
import SelectAction from "../../../reUseComponents/SelectAction";
import TransferService from "../../../../service/TransferService";

const PayService = observer(() => {
    const {bills} = AccountStore;
    const {cards} =CardStore;

    const [bill, setBill] = useState(bills[0].account_number)
    const [state, setState] = useState('service')
    const[flag, setFlag] = useState(true)
    const [card, setCard] = useState('')
    const[sum, setSum] = useState('')
    const[where, setWhere] = useState('')

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
        <div className='page_chr'>
            {state==='service' &&
                <div className='cardholder' style={{marginTop:"4%"}}>
                    <h1>Оплатить</h1>
                    <SelectAction flag={flag} setFlag={setFlag} case1={'Списать с карты'} case2={'Списать со счета'}/>
                    <form onSubmit={sendDuty} className='service'>
                        {flag?
                                <CardSelect cards={cards} card={card} onChange={value=>setCard(value)}/>
                            :
                            <BillSelect bills={bills} bill={bill} onChange={value => setBill(value)}/>
                        }
                        <h4 className='pay_header'>Назначение платежа</h4>
                            <input  className='pay_input' placeholder={'Описание платежа'} onChange={(e)=>setDescription(e.target.value)}/>
                        <h4 className='pay_header'>Номер счета для перевода</h4>
                            <input className='pay_input' placeholder='Cчет' onChange={(e)=>setWhere(e.target.value)}/>
                        <h4 className='pay_header'>Сумма перевода</h4>
                            <CurrencyInput className='pay_input'
                                placeholder='Сумма..'
                                decimalsLimit={2}
                                required={true}
                                defaultValue={sum}
                                onValueChange={(e)=>setSum(e)}
                             />
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
        </div>
    );
});

export default PayService;
import React, {useEffect, useState} from 'react';
import '../../../styles/Common.css'
import './MoneyToSomewhere.css'
import CurrencyInput from "react-currency-input-field";
import './PaymentElem.css'
import Confirm from "./Modal/Confirm";
import CardSelect from "./CardSelect";
import BillSelect from "../../Other/Valuta/BillSelect";
import CardService from "../../../../service/CardService";
import {observer} from "mobx-react-lite";
import AccountStore from "../../../../store/AccountStore";
import CardStore from "../../../../store/CardStore";

const PayService = observer(() => {
    const {bills} = AccountStore;
    const {cards} =CardStore;

    const [bill, setBill] = useState('')
    const [state, setState] = useState('service')
    const[flag, setFlag] = useState(true)
    const [card, setCard] = useState('')
    const[sum, setSum] = useState('')
    const[where, setWhere] = useState('')

    const sendDuty =()=>{
        setState('confirmation')
    }
    const[description, setDescription] = useState('')

    return (
        <div className='page_chr'>
            {state==='service' &&
                <div className='cardholder' style={{marginTop:"4%"}}>
                    <h1>Оплатить</h1>
                    <div style={{width:'60%', marginLeft:"15%", marginTop:"5%", display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        <button
                            onClick={()=>setFlag(true)}
                            style={flag?{color:'mediumaquamarine',textDecoration:'underline'}:{color:'gray'}}
                            className='pay_switch'>Списать с карты
                        </button>
                        <button
                            onClick={()=>setFlag(false)}
                            style={flag?{color:'gray'}:{color:'mediumaquamarine',textDecoration:"underline"}}
                            className='pay_switch'>
                            Списать со счета
                        </button>
                    </div>
                    <form onSubmit={sendDuty} className='service'>
                        {flag?
                                <CardSelect cards={cards} card={card} onChange={value=>setCard(value)}/>
                            :
                            <BillSelect bills={bills} bill={bill} onChange={value => setBill(value)}/>
                        }
                        <h4 className='pay_header'>Назначение платежа</h4>
                            <input className='pay_input' placeholder={'Описание платежа'} onChange={(e)=>setDescription(e.target.value)}/>
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
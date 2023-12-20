import React, {useState} from 'react';
import '../../../styles/Common.css'
import './MoneyToSomewhere.css'
import CurrencyInput from "react-currency-input-field";
import CardList from "../../Home/CardList";
import './PaymentElem.css'
import Confirm from "./Modal/Confirm";
import Execute from "./Modal/Execute";
import CardSelect from "./CardSelect";
import BillSelect from "../../Other/Valuta/BillSelect";
const PayService = () => {

    const [state, setState] = useState('service')
    const[cards, setCards] = useState([
        {id:1,cardType:'Дебетовая карта', cardNum:'123', balance:'11000.20'},
        {id:2,cardType:'Кредитная карта', cardNum:'253', balance:'1500.12'},
        {id:3,cardType:'Дебетовая карта', cardNum:'188', balance:'250000.65'}
    ]);
    const [bills, setBills] = useState([
        {id:1, billType:'Текущий счет', billNum:'458', balance:'25000,45'},
        {id:2, billType:'Текущий счет', billNum:'485', balance:'280,05'}
    ])
    const[bill, setBill] = useState(bills[0].id)
    const[flag, setFlag] = useState(true)
    const [card, setCard] = useState(cards[0].id)
    const[sum, setSum] = useState('')
    const[where, setWhere] = useState('')
    const sendDuty =()=>{
        setState('confirmation')
    }

    const[description, setDescription] = useState('')
    return (
        <div className='page_chr'>
            <CardList/>
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
                        <button className='paybtn'>Продолжить</button>
                    </form>
                </div>
            }
            {state ==='confirmation'&&
                    <Confirm status={state} setStatus={setState}/>
            }
            {state ==='access' &&
                <Execute
                    title={'Оплачено'}
                    txt1={where}
                    txt2={sum}
                    description={description}
                />
            }
        </div>
    );
};

export default PayService;
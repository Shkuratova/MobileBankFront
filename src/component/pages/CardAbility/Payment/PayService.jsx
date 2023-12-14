import React, {useState} from 'react';
import '../../../styles/Common.css'
import './MoneyToSomewhere.css'
import CurrencyInput from "react-currency-input-field";
import CardList from "../../Home/CardList";
import './PaymentElem.css'
import Confirm from "./Modal/Confirm";
import Execute from "./Modal/Execute";
const PayService = () => {

    const [state, setState] = useState('service')
    const[cards, setCards] = useState([
        {id:1,cardType:'Дебетовая карта', cardNum:'123', balance:'11000.20'},
        {id:2,cardType:'Кредитная карта', cardNum:'253', balance:'1500.12'},
        {id:3,cardType:'Дебетовая карта', cardNum:'188', balance:'250000.65'}
    ]);
    const [card, setCard] = useState(cards[0].id)
    const[sum, setSum] = useState('')
    const[bill, setBill] = useState('')
    const sendDuty =()=>{
        setState('confirmation')
    }
    const[description, setDescription] = useState('')
    return (
        <div className='page_chr'>
            <CardList/>
            {state==='service' &&
                <div className='cardholder' style={{marginTop:"4%"}}>
                    <form onSubmit={sendDuty} className='service'>
                        <h1>Оплатить</h1>
                        <h4 className='pay_header'>Списать со счета</h4>
                        <select className='pay_select'>
                            {cards.map((c)=>
                                <option key={c.cardNum}
                                        value={c.id}
                                >
                                    {'****'+c.cardNum + '   [' + c.cardType +']   ' + c.balance + ' руб.'}
                                </option>
                            )}
                        </select>
                        <h4 className='pay_header'>Назначение платежа</h4>
                        <input className='pay_input' onChange={(e)=>setDescription(e.target.value)}/>
                        <h4 className='pay_header'>Номер счета для перевода</h4>
                        <input className='pay_input' placeholder='Cчет' onChange={(e)=>setBill(e.target.value)}/>
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
                    txt1={bill}
                    txt2={sum}
                    description={description}
                />
            }
        </div>
    );
};

export default PayService;
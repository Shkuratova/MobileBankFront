import React, {useState} from 'react';
import './MoneyToSomewhere.css'
import './../../../styles/Common.css'
import CardList from "../../Home/CardList";
import Confirm from "./Modal/Confirm";
import Execute from "./Modal/Execute";
import CurrencyInput from "react-currency-input-field";
import valuteCourse from "../../ValutaCourse";

const ToSelf = () => {
    const[cards, setCards] = useState([
        {id:1,cardType:'Дебетовая карта', cardNum:'123', balance:'11000.00'},
        {id:2,cardType:'Кредитная карта', cardNum:'253', balance:'1500.12'},
        {id:3,cardType:'Дебетовая карта', cardNum:'188', balance:'25000.65'}
    ]);
    const [card, setCard] = useState(cards[0].id)
    const [cardTo, setCardTo] = useState(cards[1].id)
    const [to, setTo] = useState(cards.filter(s=>s.id!==cards[0].id))
    const [sum, setSum] = useState('')
    const [error, setError] = useState(false)
    const changeList = (e) => {
        setCard(e.target.value)
        setTo(cards.filter(s => s.id != e.target.value))
    }
    const [status, setStatus]  =useState('input')
    const postPay = ()=>{
        console.log(card, cardTo)
        setStatus('podtv')
       //запрос на перевод
    }

    return (
        <div className="page_chr">
            <CardList/>
            {status === 'input' &&
                <div className='cardholder'>
                    <form onSubmit={postPay}>
                        <h1>Между своими счетами</h1>
                        <div className="cardFrom">
                            <p>Откуда</p>
                            <select className="mySelect"
                                    value={card}
                                    onChange={e => changeList(e)}>
                                {cards.map((e) =>
                                    <option key={e.id}
                                            value={e.id}>
                                        {'****'+e.cardNum + '   [' + e.cardType +']   ' + e.balance + ' руб.'}
                                    </option>)}
                            </select>
                            <div className="cardTo">
                                <p>Куда</p>
                                <select className="mySelect"
                                        value={cardTo}
                                        onChange={e =>
                                            setCardTo(Number(e.target.value))}>
                                    {to.map((e) =>
                                        <option
                                            key={e.id+1}
                                            value={e.id}>
                                            {'****'+e.cardNum + '   [' + e.cardType +']   ' + e.balance + ' руб.'}
                                        </option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="submition">
                            <CurrencyInput
                                className='cin'
                                placeholder='Сумма..'
                                decimalsLimit={2}
                                required={true}
                                defaultValue={sum}
                                allowNegativeValue={false}
                                onValueChange={(e)=>setSum(e)}
                                />
                            <button className='myBtn'>Продолжить</button>
                        </div>
                    </form>
                </div>
            }
            {status === 'podtv' &&
               <Confirm  status={status} setStatus={setStatus}/>
            }
            {status === 'access' &&
                <Execute
                    title ={'Перевод выполнен'}
                    txt1={'****' + to.find(t=>t.id === cardTo).cardNum}
                    txt2={sum}
                />
            }
        </div>
    );
};

export default ToSelf;
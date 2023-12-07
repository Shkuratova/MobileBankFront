import React, {useState} from 'react';
import CardList from "../../Home/CardList";
import './MoneyToSomewhere.css'
import './../../../styles/Common.css'
import Button from "../../../reUse/Button";

const ToSelf = () => {
    const[cards, setCards] = useState([
        {id:1,cardType:'Дебетовая карта', cardNum:'123', balance:'11000,00'},
        {id:2,cardType:'Кредитная карта', cardNum:'253', balance:'1500,12'},
        {id:3,cardType:'Дебетовая карта', cardNum:'188', balance:'250000,65'}
    ]);
    const [card, setCard] = useState(cards[0].id)
    const [cardTo, setCardTo] = useState(cards[1].id)
    const [to, setTo] = useState(cards.filter(s=>s.id!==cards[0].id))
    const [sum, setSum] = useState(0)
    const changeList = (e) => {
        setCard(e.target.value)
        setTo(cards.filter(s => s.id != e.target.value))
    }
    const [status, setStatus]  =useState('input')
    const postPay = ()=>{
        console.log(card, cardTo)
        // axios({
        //     method: 'post',
        //     url: 'http://localhost:8080/payment/toSelf/' + card,
        //     data: {
        //         id: card,
        //         idTo: To
        //     },
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8"
        //     }
        // })
        //     .then(response=>{
        //
        //     })
        //     .catch(function (error){
        // })
        setStatus('podtv')
    }
    const commit =()=>{
        //запрос
        setStatus('access')
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
                            value={e.id}>{e.cardNum + ' ' + e.cardType + '        ' + e.balance}</option>)}
                    </select>
                    <div className="cardTo">
                        <p>Куда</p>
                        <select className="mySelect"
                                value={cardTo}
                                onChange={e =>
                                    setCardTo(e.target.value)}>
                            {to.map((e) =>
                                <option key={e.id+1} value={e.id}>{e.cardNum + '  ' + e.cardType +'       ' + e.balance}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="submition">
                    <input onChange={e=>setSum(Number(e.target.value))}
                        className="cin" placeholder="Cколько"/>
                    <Button>Продолжить</Button>
                </div>
                </form>
            </div>
            }
            {status === 'podtv' &&
                <div className='cardholder'>
                <h1>Подтверждение</h1>
                    <div className='cardFrom'>
                        <h3>Введите пароль</h3>
                        <input className='cin' type='password' placeholder='Пароль...'/>
                        <Button onClick={commit}>Подтвердить</Button>
                    </div>
                </div>
            }
            {status === 'access' &&
                <div className='cardholder'>
                    <h1>Перевод выполнен</h1>
                    <h2>{to.find(t=>t.id === cardTo).cardNum}</h2>
                    <h3>{sum}</h3>
                </div>
            }
        </div>
    );
};

export default ToSelf;
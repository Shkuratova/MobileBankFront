import React, {useState} from 'react';
import CardList from "../../Home/CardList";
import '../../../styles/Common.css'

const CardSelect = () => {
    const[cards, setCards] = useState([
        {id:1,cardType:'Дебетовая карта', cardNum:'123', balance:'11000,00'},
        {id:2,cardType:'Кредитная карта', cardNum:'253', balance:'1500,12'},
        {id:3,cardType:'Дебетовая карта', cardNum:'188', balance:'250000,65'}
    ]);
    const [card, setCard] = useState(cards[0].id)
    const [cardTo, setCardTo] = useState(cards[1].id)
    const [to, setTo] = useState(cards.filter(s=>s.id!==cards[0].id))

    const changeList = (e) => {
        setCard(e.target.value)
        setTo(cards.filter(s => s.id != e.target.value))
    }
    return (
        <div className="page_chr">
            <CardList/>
            <select value={card}
                    onChange={e=>
                                changeList(e)}>
                {cards.map((e)=>
                <option value={e.id}>{e.cardNum +' ' + e.cardType +' ' + e.balance}</option>
                )}
            </select>
            <select
                value={cardTo}
                    onChange={e=>
                        setCardTo(e.target.value)}>
                {to.map((e)=>
                    <option value={e.id}>{e.cardNum +'  ' + e.cardType}</option>
                )}
            </select>
        </div>
    );
};

export default CardSelect;
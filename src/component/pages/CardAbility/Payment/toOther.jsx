import React, {useState} from 'react';
import CardSelect from "./CardSelect";

const ToOther = () => {
    const[cards, setCards] = useState([
        {id:1,cardType:'Дебетовая карта', cardNum:'123', balance:'11000,00'},
        {id:2,cardType:'Кредитная карта', cardNum:'253', balance:'1500,12'},
        {id:3,cardType:'Дебетовая карта', cardNum:'188', balance:'250000,65'}
    ]);
    const [card, setCard] = useState(cards[0].id)
    return (
        <div>

        </div>
    );
};

export default ToOther;
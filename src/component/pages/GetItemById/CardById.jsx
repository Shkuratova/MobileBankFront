import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import "../../styles/Common.css";
import CardList from "../Home/CardList";
import './idElements.css';
import Action from "../../reUse/Action";
import {CARD, HISTORY} from "../../utils/consts";
import Window from "../../reUse/Window";
import '../../reUse/Action.css'
import Block from "../CardAbility/Block";
import RenameCard from "../CardAbility/RenameCard";
const CardById = () => {
    const inf= useParams()
    const [card, setCard] = useState(
        {id:1,cardType:'Дебетовая карта', cardNum:'123', balance:'11000,00'})
    const[visibleBlock, setVisibleBlock] = useState(false)
    const[visibleRe, setVisibleRe] = useState(false)
    const[cardName, setCardName]=useState('')
    return (
           <div className="page_chr">
                   <CardList/>
                <div className="infor">
                    <Window setVisible={setVisibleBlock} visible={visibleBlock}>
                        <Block cardNum={card.cardNum} visible={visibleBlock} setVisible={setVisibleBlock}/>
                    </Window>
                    <Window setVisible={setVisibleRe} visible={visibleRe}>
                      <RenameCard cardNum={card.cardNum}  cardId={card.id} visible={visibleRe} setVisible={setVisibleRe} setCardName={setCardName}/>
                    </Window>
                    <div className="descr">
                        <h1  className="descr_txt">МИР WorldSkills Card</h1>
                        <h3 className='descr_txt'>{localStorage.getItem(card.id)}</h3>
                        <p className="descr_txt spec">***{card.cardNum} {card.cardType}</p>
                        <h2 className="bl">{card.balance} ₽</h2>
                    </div>
                    <div className="abil">
                        <p className="descr_txt spec">Действия</p>
                        <Action
                            path = {CARD+HISTORY+'/'+card.id}
                            img={'/images/history.png'}
                            height={'50'}
                            width={'50'}
                            name = {'История операций'}/>
                        <Action
                            path = {'/payment'}
                            img={'/images/pay.png'}
                            height={'50'}
                            width={'50'}
                            name = {'Оплатить'}/>
                    </div>
                    <div className="abil">
                        <div onClick={()=>setVisibleRe(true)}
                             className="action">
                            <img className="act_img"
                                 width='50'
                                 height='50'
                                 src='/images/rename.png'/>
                            <p className='act_txt'>Переименовать</p>
                        </div>
                        <div onClick={()=>setVisibleBlock(true)}
                             className="action">
                            <img className="act_img"
                                 width='50'
                                 height='50'
                                 src='/images/block.png'/>
                            <p className='act_txt'>Заблокировать</p>
                        </div>
                    </div>
                </div>
           </div>
    );
};

export default CardById;
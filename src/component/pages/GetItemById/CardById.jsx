import React, {useEffect, useState} from 'react';
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
import axios from "axios";
const CardById = () => {
    const inf= useParams()
    const [card, setCard] = useState(
        )
    const[visibleBlock, setVisibleBlock] = useState(false)
    const[visibleRe, setVisibleRe] = useState(false)
    const[cardName, setCardName]=useState('')
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        axios
            .get(`/api/v1/get_cards/?token_card=${inf.id}`, {headers:
                    {
                        Authorization:localStorage.getItem('token')
                    }
            })
            .then((response)=>{
                setCard(response.data[0]);
                setIsLoading(false)
                console.log(card)
            })
            .catch(function (error){
                if(error.response){
                    console.log(error.response.data)
                }
            });
    }, [inf.id]);
    return (
           <div className="page_chr">
               {isLoading? <div></div>
                   :

                <div className="infor">
                    {/*<Window setVisible={setVisibleBlock} visible={visibleBlock}>*/}
                    {/*    <Block cardNum={card.cardNum} visible={visibleBlock} setVisible={setVisibleBlock}/>*/}
                    {/*</Window>*/}
                    {/*<Window setVisible={setVisibleRe} visible={visibleRe}>*/}
                    {/*  <RenameCard cardNum={card.cardNum}  cardId={card.id} visible={visibleRe} setVisible={setVisibleRe} setCardName={setCardName}/>*/}
                    {/*</Window>*/}
                    <div className="descr">
                        <h1  className="descr_txt">{card.payment_system} WorldSkills Card</h1>
                        <h3 className='descr_txt'>{localStorage.getItem(card.token_card)}</h3>
                        <p className="descr_txt spec">{card.card_name}</p>
                        <p className="descr_txt spec"> {card.type_account ==='debit'? ' Дебетовая карта':'Кредитная карта'}</p>
                        <h2 className="bl">{card.balance} {card.currency}</h2>
                    </div>
                    <div className="abil">
                        <p className="descr_txt spec">Действия</p>
                        <Action
                            path = {CARD+HISTORY+'/'+card.account_number+'/'+card.token_card}
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
               }
           </div>
    );
};

export default CardById;
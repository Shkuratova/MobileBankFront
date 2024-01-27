import React, {useEffect} from 'react';
import './CardList.css'

import {useLocation} from "react-router-dom";
import AccountStore from "../../../store/AccountStore";
import {observer} from "mobx-react-lite";
import CardStore from "../../../store/CardStore";
import PersonStore from "../../../store/UserStore";
import ItemList from "./ItemList";

export const CardList = observer( () => {
    const {isAuth} = PersonStore;
    const {getAccounts, credit,debit, isLoad, bills} = AccountStore;
    const {getCards, isLoading, cards} = CardStore;
    const  p = useLocation()

    useEffect(() => {
        getAccounts()
    }, []);
    useEffect(() => {
        getCards()
    }, []);
    if (p.pathname === '/atm' || p.pathname === '/currency' || !isAuth)
        return null
    return (
        <div className="new_cardList">
            {(isLoad || isLoading) ?
                <div className="title_list" >
                <div className="load-line chet"></div>
                <div className="load-line nechet"></div>
                <div className="load-line third"></div>
                </div>
                :
                <>
                    <ItemList cards={debit} title={"Счета"}/>
                    <ItemList cards={cards} title={"Карты"}/>
                    <ItemList cards={credit} title={"Кредиты"}/>
                </>
            }
        </div>

    );
});

export default CardList;
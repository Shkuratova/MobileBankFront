import React, {useEffect, useState} from 'react';
import './CardList.css'

import {useLocation} from "react-router-dom";
import AccountStore from "../../../store/AccountStore";
import {observer} from "mobx-react-lite";
import CardStore from "../../../store/CardStore";
import PersonStore from "../../../store/PersonStore";
import CreditCard from "./CreditCard";
import CardItem from "./CardItem";
import BillItem from "./BillItem";
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
            {(isLoading || isLoad) ?
                <>
                <div className="load-line"></div>
                <div className="load-line"></div>
                <div className="load-line"></div>
                </>
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
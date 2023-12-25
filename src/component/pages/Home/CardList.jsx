import React, {useContext, useEffect} from 'react';
import './CardList.css'
import CardItem from "./CardItem";
import CreditCard from "./CreditCard";
import BillItem from "./BillItem";
import {useLocation} from "react-router-dom";
import AccountStore from "../../../store/AccountStore";
import {observer} from "mobx-react-lite";
import CardStore from "../../../store/CardStore";
import {AuthContext} from "../../../context";

export const CardList = observer( () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const {getAccounts, credit,debit, isLoad} = AccountStore;
    const {getCards, isLoading, cards} = CardStore;
    const  p = useLocation()


    useEffect(() => {
        getAccounts()
    }, []);
    useEffect(() => {
        getCards()
    }, []);

    if (p.pathname === '/atm' || p.pathname === '/currency' || !isAuth)
        return null;
    return (
        <>
        {
            (isLoading|| isLoad)?
                    <div className='card_list' >
                        <p className='tit'>Загрузка</p>
                    </div>
                :
                <div style={{height:"75%", overflow:"hidden"}}>
                <div className="card_list">
                    {cards.length &&
                        <>
                            <p className="tit">Мои Карты</p>
                    <div className="cardl" style={{height:"40%"}}>
                        {cards.map((card) =>
                            <CardItem key={card.card_name}
                                      card={card}/>
                        )}
                    </div>
                        </>
                    }
                    <p className="tit">Мои Счета</p>
                    <div className="cardl" style={{height:"40%"}}>
                        {debit.map((bill) =>
                            <BillItem key={bill.account_number}
                                      bill={bill}/>
                        )}
                    </div>
                    {credit?
                        <>
                    <p className="tit" >Мои Кредиты</p>
                    <div className="cardl" style={{height:"20%"}}>
                        {credit.map((c) =>
                            <CreditCard key={c.account_number} credit={c}/>
                        )}
                    </div>
                        </>
                        :<div></div>
                    }
                </div>
                    </div>
        }
        </>
    );
});

export default CardList;
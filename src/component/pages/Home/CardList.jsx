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

export const CardList = observer( () => {
    const {isAuth} = PersonStore;
    const {getAccounts, credit,debit, isLoad, bills} = AccountStore;
    const {getCards, isLoading, cards} = CardStore;
    const  p = useLocation()

    const [visible, setVisible]= useState(false)
    const[visible1, setVisible1] = useState(false)
    const[visible2, setVisible2] = useState(false)
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
                    <p >Загрузка</p> :
                <>
                    <div>
                        <p onClick={()=>setVisible(!visible)}>Счета</p>
                        <div className="list_accounts" style={visible?{display:"flex"}:{display:"none"}}>
                            {bills.length !==0 &&
                            bills.map((bill) =>
                                <BillItem key={bill.account_number}
                                          bill={bill}/>
                            )}
                        </div>
                    </div>

                    <div className="list_type">
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <p onClick={()=>setVisible1(!visible1)}>Карты</p>
                            <div className="arrow "></div>
                        </div>


                        <div  className="list_accounts" style={visible1?{display:"flex"}:{display:"none"}}>
                            {cards.length !== 0 &&
                                    cards.map((card) =>
                                        <CardItem key={card.card_name}
                                                  card={card}/>
                                    )}
                        </div>
                    </div>

                    <div className="list_type">
                        <p onClick={()=>setVisible2(!visible2)}>Кредиты</p>
                        <div  className="list_accounts" style={visible2?{display:"flex"}:{display:"none"}}>
                            {credit.length !== 0 &&
                                credit.map((c) =>
                                        <CreditCard key={c.account_number} credit={c}/>
                                )}
                        </div>
                    </div>
                </>
            }
        </div>
        // <div className="cc">
        // {
        //     (isLoading|| isLoad)?
        //             <div className='card_list' >
        //                 <p className='tit'>Загрузка</p>
        //             </div>
        //         :
        //         <div >
        //         <div className="card_list">
        //
        //             <p className="tit" onClick={()=>setVisible(!visible)}>Счета</p>
        //             <div className="cardl"  style={visible?{display:"block"}:{display:"none"}}>
        //                 {bills.map((bill) =>
        //                     <BillItem key={bill.account_number}
        //                               bill={bill}/>
        //                 )}
        //             </div>
        //             <div className="card_list">
        //
        //             {cards.length !== 0&&
        //                 <>
        //                     <p className="tit">Карты</p>
        //                     <div className="cardl" >
        //                         {cards.map((card) =>
        //                             <CardItem key={card.card_name}
        //                                       card={card}/>
        //                         )}
        //                     </div>
        //                 </>
        //             }
        //             </div>
        //             <div className="card_list">
        //             {credit.length !==0 &&
        //                 <>
        //             <p className="tit" >Кредиты</p>
        //             <div className="cardl" >
        //                 {credit.map((c) =>
        //                     <CreditCard key={c.account_number} credit={c}/>
        //                 )}
        //             </div>
        //                 </>
        //             }
        //             </div>
        //         </div>
        //             </div>
        // }
        // </div>
    );
});

export default CardList;
import React from 'react';
import NewAccount from "../Home/OpenBill/NewAccount";
import './main.css'
import {NavLink, useNavigate} from "react-router-dom";
import CurrencyBlock from "./CurrencyBlock";
const MainPage = () => {
    const nav = useNavigate()
    return (
        <>
        <div className="action--block">
            <NewAccount/>
            < div style={{display:"flex", flexDirection:"row",padding:"2%",marginTop:"4%", justifyContent:"space-between"}}>
                <div onClick={()=>nav('/payment')}
                    className="main--action info_box">
                    <img width={"50px"} height={"50px"} src="/images/card.png"/>
                    <div className="mainTitle">
                        <h3>Платежи</h3>
                        <p>Оплатить</p>
                    </div>
                </div>
                <div onClick={()=>nav('/payment/service')} className="main--action info_box">
                    <img width={"50px"} height={"50px"} src="/images/card.png"/>
                    <div className="mainTitle">
                        <h3>Платежи</h3>
                        <p>Оплатить</p>
                    </div>
                </div>
            </div>
        </div>
            <CurrencyBlock/>

        </>
    );
};

export default MainPage;
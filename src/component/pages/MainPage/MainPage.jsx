import React from 'react';
import NewAccount from "../Home/OpenBill/NewAccount";
import './main.css'
import {NavLink, useNavigate} from "react-router-dom";
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
            <div className=" valute--main info_box">
                <h1>
                    fff
                </h1>
            </div>
        </>
    );
};

export default MainPage;
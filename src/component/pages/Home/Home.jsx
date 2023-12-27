import React, {useState} from 'react';
import "../../styles/Common.css"
import CardList from "./CardList";
import Action from "../../reUseComponents/Action";
import './Home.css'
const Home = () => {

    return (
        <div className="page_chr">
            <div className='add_bill'>
                <Action path ={'/new_card'}
                        img = {'/images/card.png'}
                        height = {50}
                        width = {50}
                        name={'Оформить карту'}
                />
                <Action path ={'/new_bill'}
                        img = {'/images/plus.png'}
                        height = {50}
                        width = {50}
                        name={'Открыть счет'}
                />
                <Action path ={'/new_credit'}
                        img = {'/images/pay.png'}
                        height = {50}
                        width = {50}
                        name={'Оформить кредит'}
                />
            </div>
        </div>
    );
};

export default Home;
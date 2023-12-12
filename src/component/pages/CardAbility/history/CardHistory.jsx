import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import '../../../styles/Common.css'
import CardList from "../../Home/CardList";
import './history.css'
import HistoryItem from "./HistoryItem";
const CardHistory = () => {
    const p = useParams()
    const[histList, setHistList]= useState([{end_transaction:"12-05-2023",
        type:"Перевод клиенту", where:"***6587", sum:"800,55"}
   ])
    return (
        <div className='page_chr'>
            <CardList/>
            <div className='history__list'>
                <h1 style={{padding:"2%"}}>История операций {p.id}</h1>
                <HistoryItem transaction = {histList[0]}/>
            </div>
        </div>
    );
};

export default CardHistory;
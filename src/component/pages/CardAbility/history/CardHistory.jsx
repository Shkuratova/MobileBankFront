import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import '../../../styles/Common.css'
import CardList from "../../Home/CardList";
import './history.css'
import HistoryItem from "./HistoryItem";
import axios from "axios";
import CardItem from "../../Home/CardItem";
import CardStore from "../../../../store/CardStore";
import {observer} from "mobx-react-lite";
export const CardHistory =observer( () => {
    const {cards} = CardStore
    const p = useParams()
    const[histList, setHistList]= useState([])
    const[isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        axios
            .get("/api/v1/get_operations/", {headers:
                    {
                        Authorization: localStorage.getItem('token')
                    },
                    params:{
                        account_number:p.account_number,
                        token_card:p.token_card,
                        status_operation:'success'
                    }
            })
            .then((response)=>{
                console.log(response.data)
                setHistList(Object.values(response.data))
                setIsLoading(false)
                console.log(histList[0].From)
            })
            .catch(function (error){
                if(error.response){
                    console.log(error.response.data)
                }
            });

    }, []);
    return (
        <div className='page_chr'>
            {isLoading?<div></div>:
            <div className='history__list'>
                {p.token_card?
                <h1 style={{padding:"2%"}}>История операций
                    ****{cards.find((c)=>c.token_card===p.token_card).card_name.slice(-4)}</h1>
                    :
                    <h1>История операций ****{p.account_number.slice(-4)}</h1>
                }
                {histList.map((h) =>
                    <HistoryItem key={h.start_transaction} transaction={h} />
                )}
            </div>
            }
        </div>
    );
});

export default CardHistory;
import React, {useEffect, useState} from 'react';
import CardList from "../Home/CardList";
import '../../styles/Common.css'
import Action from "../../reUseComponents/Action";
import axios from "axios";
import {useParams} from "react-router-dom";
import CardService from "../../../service/CardService";
const BillById = () => {
    const inf = useParams()
    const [bill, setBill] = useState(
    )
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        const getBill= async ()=>{
            try{
                const response = await CardService.billById(inf.id)
                setBill(response.data[0])
                setIsLoading(false)
            }catch (e) {
                console.log(e.response.data)
            }
        }
       getBill()
    }, [inf.id]);
    return (
        <div className="page_chr">
            {isLoading? <div></div>:
            <div className="infor">
                <div className="descr">
                    <h1  className="descr_txt">WorldSkills Счет</h1>
                    <p className="descr_txt spec">{bill.account_number}</p>
                    <h2 className="bl">{bill.balance} {bill.currency}</h2>
                </div>
                <div className="abil">
                    <p className="descr_txt spec">Действия</p>
                    <Action
                        path = {'/bill/history/'+bill.account_number}
                        img={'/images/history.png'}
                        height={'50'}
                        width={'50'}
                        name = {'История операций'}/>
                </div>
            </div>
            }
        </div>
            );
};

export default BillById;
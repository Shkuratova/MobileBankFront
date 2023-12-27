import React, {useEffect, useState} from 'react';
import CardList from "../Home/CardList";
import Action from "../../reUseComponents/Action";
import axios from "axios";
import {useParams} from "react-router-dom";
import CardService from "../../../service/CardService";

const CreditById = () => {
    const inf = useParams()
    const [credit, setCredit] = useState()
    const[isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        const getBill= async ()=>{
            try{
                const response = await CardService.billById(inf.id)
                setCredit(response.data[0])
                setIsLoading(false)
            }catch (e) {
                console.log(e.response.data)
            }
        }
        getBill()
    }, [inf.id]);
    return (
        <div className="page_chr">
            {isLoading? <div></div>
                :
            <div className="infor">
                <div className="descr">
                    <h1  className="descr_txt">WorldSkills  Кредит наличными</h1>
                    <p className="descr_txt spec">{credit.account_number}</p>
                    <h2 className="bl">Лимит {credit.description.max_debt_amount} {credit.currency}</h2>
                    <p className="descr_txt">Беспроцентный период: {credit.description.description.grace_period} дней</p>
                    <p className="bl">Процентная ставка: {credit.description.description.percent_rate}%</p>
                    <p className="bl">Счет {credit.balance.replace('-','')} {credit.currency}</p>
                    <Action path={'/credit/history/' + credit.account_number}
                            img={'/images/history.png'}
                            width={'50'}
                            height={'50'}
                            name={'История операций'}
                            />
                </div>
            </div>
            }
        </div>

    );
};

export default CreditById;
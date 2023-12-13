import React, {useEffect, useState} from 'react';
import axios from "axios";
import ValuteItem from "./Other/ValuteItem";
import '../styles/Common.css'

const ValutaCourse = () => {
    const[curr, setCurr] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    useEffect (() => {
        axios
            .get("https://www.cbr-xml-daily.ru/daily_json.js")
            .then((response)=>{
                setCurr(response.data)
                setIsLoading(false)
                console.log(response.data)
            })

    }, []);
    return (
        <div className='page_chr'>
            {isLoading?
                <h1>Загрузка...</h1>
                :
            <div className='val_list'>
                <ValuteItem
                    CharCode={curr.Valute.USD.CharCode}
                    Nominal={curr.Valute.USD.Nominal}
                    Value={curr.Valute.USD.Value}
                    Name={curr.Valute.USD.Name}/>
                <ValuteItem
                    CharCode={curr.Valute.EUR.CharCode}
                    Nominal={curr.Valute.EUR.Nominal}
                    Value={curr.Valute.EUR.Value}
                    Name={curr.Valute.EUR.Name}/>
                <ValuteItem
                    CharCode={curr.Valute.GBP.CharCode}
                    Nominal={curr.Valute.GBP.Nominal}
                    Value={curr.Valute.GBP.Value}
                    Name={curr.Valute.GBP.Name}/>
                <ValuteItem
                    CharCode={curr.Valute.BYN.CharCode}
                    Nominal={curr.Valute.BYN.Nominal}
                    Value={curr.Valute.BYN.Value}
                    Name={curr.Valute.BYN.Name}/>
                <ValuteItem
                    CharCode={curr.Valute.KZT.CharCode}
                    Nominal={curr.Valute.KZT.Nominal}
                    Value={curr.Valute.KZT.Value}
                    Name={curr.Valute.KZT.Name}/>
                <ValuteItem
                    CharCode={curr.Valute.PLN.CharCode}
                    Nominal={curr.Valute.PLN.Nominal}
                    Value={curr.Valute.PLN.Value}
                    Name={curr.Valute.PLN.Name}/>
                <ValuteItem
                    CharCode={curr.Valute.CNY.CharCode}
                    Nominal={curr.Valute.CNY.Nominal}
                    Value={curr.Valute.CNY.Value}
                    Name={curr.Valute.CNY.Name}/>
                <ValuteItem
                    CharCode={curr.Valute.JPY.CharCode}
                    Nominal={curr.Valute.JPY.Nominal}
                    Value={curr.Valute.JPY.Value}
                    Name={curr.Valute.JPY.Name}/>
                <br style={{marginTop:"20px"}}/>
            </div>
            }
        </div>
    );
};

export default ValutaCourse;
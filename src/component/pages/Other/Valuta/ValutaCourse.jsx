import React, {useEffect, useState} from 'react';
import axios from "axios";
import '../../../styles/Common.css'
import './valute.css'
import ValuteItem from "./ValuteItem";
import CardItem from "../../Home/CardItem";

const ValutaCourse = () => {
    const[Cur, setCurr] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const p = []
useEffect(() => {
    setIsLoading(true)
    axios
        .get("/api/v1/get_currencies/", {headers:
                {
                    Authorization:localStorage.getItem('token')
                }})
        .then((response)=>{
         setCurr(Object.values(response.data))
            setIsLoading(false);
        })
        .catch(function (error){
            if(error.response){
                console.log(error.response.data)
            }
        });
}, []);

    console.log(p)
    return (
        <div className='page_chr'>
            {isLoading?
                <h1>Загрузка...</h1>
                :<div className='val_list'>
                    {Cur.map((c) =>
                        <ValuteItem key={c.CharCode} CharCode={c.CharCode} Nominal={c.Nominal}
                         PurchasePrice={c.PurchasePrice} Name={c.Name} SalePrice={c.SalePrice}/>
                    )}
                </div>
                }
            </div>
    );
};

export default ValutaCourse;
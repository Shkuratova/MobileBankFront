import React from 'react';
import './valute.css'
import {useNavigate} from "react-router-dom";
import ValutaStore from "../../store/CurrencyStore";

const ValuteItem = ({CharCode, Name, Nominal, SalePrice, PurchasePrice}) => {
    const{setVal} = ValutaStore
    const router = useNavigate()

    const buyVal = (e)=>{
        setVal({Nominal, SalePrice, PurchasePrice})
        router('/buyvalute/' + CharCode)
    }
    return (
        <div className='valute__item'>

            <div className='info'>
                <h3 style={{width:"400px"}}>{CharCode} {Name}</h3>
                <p style={{marginTop:"10px"}}>Количество единиц: {Nominal}</p>
            </div>

            <div className='buy__sell'>
                 <div className='buy_v'>
                     <h4>Продажа</h4>
                     <p style={{marginTop:"5px", marginLeft:"8px"}}>{SalePrice}</p>
                 </div>
                  <div className='buy_v'>
                     <h4>Покупка</h4>
                     <p style={{marginTop:"5px", marginLeft:"8px"}}>{PurchasePrice}</p>
                    </div>
                <button  onClick={e=>buyVal()} className='button_v'>Обменять</button>
            </div>
        </div>
    );
};

export default ValuteItem;
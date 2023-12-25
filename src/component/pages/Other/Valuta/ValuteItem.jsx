import React from 'react';
import './valute.css'
import {useNavigate} from "react-router-dom";

const ValuteItem = ({CharCode, Name, Nominal, SalePrice, PurchasePrice}) => {
    const router = useNavigate()
    return (
        <div className='valute__item'>

            <div className='info'>
                <h3 style={{width:"500px"}}>{CharCode} {Name}</h3>
                <p style={{marginTop:"10px"}}>Количество единиц: {Nominal}</p>
            </div>

            <div className='buy__sell'>
                 <div className='buy_v'>
                     <h4>Продажа</h4>
                     <p style={{marginTop:"5px", marginLeft:"8px"}}>{SalePrice}</p>
                 </div>
                  <div className=''>
                     <h4>Покупка</h4>
                     <p style={{marginTop:"5px", marginLeft:"8px"}}>{PurchasePrice}</p>
                    </div>
            </div>
            <button  onClick={()=>router('/buyvalute' + CharCode)} className='button_v'>Обменять</button>
        </div>
    );
};

export default ValuteItem;
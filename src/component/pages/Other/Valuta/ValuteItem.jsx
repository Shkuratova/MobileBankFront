import React from 'react';
import './valute.css'
import {useNavigate} from "react-router-dom";

const ValuteItem = ({CharCode, Name, Nominal, Value}) => {
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
                     <p style={{marginTop:"5px", marginLeft:"8px"}}>{(Value).toFixed(2).replace('.',',')}</p>
                 </div>
                  <div className=''>
                     <h4>Покупка</h4>
                     <p style={{marginTop:"5px", marginLeft:"8px"}}>{(Value*1.04).toFixed(2).replace('.',',')}</p>
                    </div>
            </div>
            <button  onClick={()=>router('/buyvalute' + CharCode)} className='button_v'>Обменять</button>
        </div>
    );
};

export default ValuteItem;
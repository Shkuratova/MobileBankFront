import React, {useState} from 'react';
import '../Home.css'
import '../../../styles/Common.css'
import './Openbill.css'
import {valutaCharCode} from "../../../utils/consts";
import CardList from "../CardList";
import axios, {post} from "axios";
const CreateBill = () => {
    const [valuta, setValuta] = useState("RUB")
    const [ans, setAns] = useState()
    const[state, setState] = useState('Open')
    const OpenBill = ()=>{
        axios
            .post("/api/v1/create_account/", {currency:valuta}, {headers:
                    {
                        Authorization:localStorage.getItem('token')
                    }})
            .then((response)=>{
                console.log(response.data);
                setAns(response.data)
                setState('Info')
            })
            .catch(function (error){
                if(error.response){
                    console.log(error.response.data)
                }
            });
    }
    return (
        <div className='page_chr'>
            {state === 'Open'&&
                <div style={{width:"35%"}} className='add_bill'>
                     <h1>Заполнение заявки</h1>
                    <div  className='contract'>
                        <p style={{display:"inline-block"}}>Валюта</p>
                        <select className='valute_select'
                            value={valuta}
                            onChange={e=>setValuta(e.target.value)}>
                            <option key={"RUB"} value={"RUB"}>Рубль</option>
                                    {valutaCharCode.map((t)=>
                             <option key={t} value={t}> {t} </option>
                                                                )}
                        </select>
                    </div>
                    <button onClick={OpenBill}
                        style={{marginLeft:"57%", width:"40%"}}
                        className='reg__button'>
                        Открыть счет</button>

                 </div>
            }
            {state === 'Info' &&
                <div style={{width:"50%"}} className='add_bill'>
                    <h1>Счет успешно открыт</h1>
                    <p>{ans.account_number}</p>
                    <p>{ans.balance} {ans.currency}</p>
                </div>
            }

        </div>
    );
};

export default CreateBill;
import React, {useEffect, useState} from 'react';
import '../Home.css'
import '../../../styles/Common.css'
import './Openbill.css'
import {valutaCharCode} from "../../../../utils/consts";
import CardService from "../../../../service/CardService";
import getSymbolFromCurrency from "currency-symbol-map";
import AccountStore from "../../../../store/AccountStore";
import {observer} from "mobx-react-lite";

const CreateBill = () => {
    const {newBill, ans} = AccountStore

    const [valuta, setValuta] = useState("RUB")
    const[state, setState] = useState('Open')

    useEffect(() => {
        if(localStorage.getItem('currency')){
            setValuta(localStorage.getItem('currency'))
        }
    }, []);
    const OpenBill = async ()=>{
        try {
            await newBill(valuta)
            setState('Info')
            localStorage.removeItem('currency')
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            {state === 'Open'&&
                <div  className='contract info_box'>
                     <h2>Заполнение заявки</h2>
                    <br/>
                        <p>Валюта</p>
                        <select className='mySelect'
                            value={valuta}
                            onChange={e=>setValuta(e.target.value)}>
                            <option key={"RUB"} value={"RUB"}>Рубль </option>
                                    {valutaCharCode.map((t)=>
                             <option key={t.CharCode} value={t.CharCode}> {t.Name}</option>
                                                                )}
                        </select>
                    <button onClick={OpenBill}
                        className='myBtn' >
                        Открыть счет</button>

                 </div>
            }
            {state === 'Info' &&
                <div style={{width:"50%"}} className='info_box add_bill'>
                    <h1>Счет успешно открыт</h1>
                    <br/>
                    <p>{ans.account_number}</p>
                    <br/>
                    <p>{ans.balance} {ans.currency}</p>
                </div>
            }

        </>
    );
};

export default observer(CreateBill);
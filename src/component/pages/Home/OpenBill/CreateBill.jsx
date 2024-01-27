import React, {useState} from 'react';
import '../Home.css'
import '../../../styles/Common.css'
import './Openbill.css'
import {valutaCharCode} from "../../../../utils/consts";
import CardService from "../../../../service/CardService";
import getSymbolFromCurrency from "currency-symbol-map";

const CreateBill = () => {
    const [valuta, setValuta] = useState("RUB")
    const [ans, setAns] = useState()
    const[state, setState] = useState('Open')
    const OpenBill = async ()=>{
        try {
            const response =await CardService.openBill(valuta);
            console.log(response)
            setAns(response.data)
            setState('Info')
        }
        catch (e) {
            console.log(e.response.data)
        }
    }
    return (
        <>
            {state === 'Open'&&
                <div  className='add_bill info_box'>
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
                <div style={{width:"50%"}} className='add_bill'>
                    <h1>Счет успешно открыт</h1>
                    <p>{ans.account_number}</p>
                    <p>{ans.balance} {ans.currency}</p>
                </div>
            }

        </>
    );
};

export default CreateBill;
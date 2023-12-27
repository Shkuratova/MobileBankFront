import React, {useState} from 'react';
import '../Home.css'
import '../../../styles/Common.css'
import './Openbill.css'
import {valutaCharCode} from "../../../../utils/consts";
import CardService from "../../../../service/CardService";

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
                             <option key={t.CharCode} value={t.CharCode}> {t.Name} </option>
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
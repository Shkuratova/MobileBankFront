import React, {useEffect, useState} from 'react';
import '../../../styles/Common.css'
import './Openbill.css'
import AccountStore from "../../../../store/AccountStore";
import BillSelect from "../../../Valuta/BillSelect";
import {observer} from "mobx-react-lite";
import {PaySystem} from "../../../../utils/consts";
import CardService from "../../../../service/CardService";

const CreateCard = () => {
    const {bills} = AccountStore
    const [bill, setBill] = useState(bills[0].account_number)
    const [paySys,setPaySys] = useState(PaySystem[0])
    const [state, setState] = useState('Create')
    const[ans, setAns] = useState('')
    useEffect(() => {
        setBill(bills[0].account_number)
    }, [bills]);
    console.log(paySys)
    const createCard = async ()=>{
        try {
            const response = await CardService.openCard(bill, paySys)
            console.log(response.data)
            setAns(response.data)
            setState('Info')
        }catch (e) {
            console.log(e.response.data)
        }
    }

    return (
        <>
            {state==='Create' &&
            <div className='contract info_box'>
                <h1>Заполнение заявки</h1>
                <div>
                    <div className='pay_field'>
                        <p className="add-title">Выберите счет, к которому хотите привязать карту</p>
                        <BillSelect bill={bill} bills={bills} onChange={value => setBill(value)}/>
                    </div>
                    <div className='pay_field'>
                        <p className="add-title">Выберите платежную систему</p>
                        <select className='pay_sys' value={paySys} onChange={(e) => setPaySys(e.target.value)}>
                            {PaySystem.map((p) =>
                                <option key={p} value={p}>{p}</option>
                            )}
                        </select>
                    </div>
                    <br/>
                    <button onClick={createCard}
                        className='myBtn'>Подтвердить</button>
                </div>
            </div>
            }
            {state ==='Info' &&
                <div className='add_bill'>
                    <h1>Карта создана</h1>
                    <div className='pay_field'>
                        <p>{ans.card_name}</p>
                        <p>Баланс: {ans.balance} {ans.currency}</p>
                    </div>
                </div>
            }
        </>
    );
};

export default observer(CreateCard);
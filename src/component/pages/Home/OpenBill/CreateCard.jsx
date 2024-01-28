import React, {useEffect, useState} from 'react';
import '../../../styles/Common.css'
import './Openbill.css'
import AccountStore from "../../../../store/AccountStore";
import BillSelect from "../../../Valuta/BillSelect";
import {observer} from "mobx-react-lite";
import {PaySystem} from "../../../../utils/consts";
import CardService from "../../../../service/CardService";
import CardStore from "../../../../store/CardStore";

const CreateCard = () => {
    const {bills} = AccountStore
    const {ans, newCard} = CardStore
    const [bill, setBill] = useState(bills[0].account_number)
    const [paySys,setPaySys] = useState(PaySystem[0])
    const [state, setState] = useState('Create')
    useEffect(() => {
        setBill(bills[0].account_number)
    }, [bills]);
    console.log(paySys)
    const createCard = async ()=>{
        try {
            await newCard(bill, paySys)
            setState('Info')
        }catch (e){
            console.log(e)
        }
        // try {
        //     const response = await CardService.openCard(bill, paySys)
        //     console.log(response.data)
        //     setAns(response.data)
        //     setState('Info')
        // }catch (e) {
        //     console.log(e.response.data)
        // }
    }

    return (
        <>
            {state==='Create' &&
            <div className='contract info_box'>
                <h2>Заполнение заявки</h2>
                <div>
                    <div className='pay_field'>
                        <p className="add-title">Выберите счет, к которому хотите привязать карту</p>
                        <BillSelect bill={bill} bills={bills} onChange={value => setBill(value)}/>
                    </div>
                    <div className='pay_field'>
                        <p className="add-title">Выберите платежную систему</p>
                        <select className='mySelect' value={paySys} onChange={(e) => setPaySys(e.target.value)}>
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
                <div className='contract info_box'>
                    <h1>Карта оформлена</h1>
                    <div className='pay_field'>
                        <p>{paySys}</p>
                        <br/>
                        <p>{ans.card_name}</p>
                        {/*<p>Баланс: {ans.balance} {ans.currency}</p>*/}
                    </div>
                </div>
            }
        </>
    );
};

export default observer(CreateCard);
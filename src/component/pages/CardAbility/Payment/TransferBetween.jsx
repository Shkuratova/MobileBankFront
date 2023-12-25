import React, {useState} from 'react';
import './MoneyToSomewhere.css'
import './../../../styles/Common.css'
import CurrencyInput from "react-currency-input-field";
import {observer} from "mobx-react-lite";
import AccountStore from "../../../../store/AccountStore";
import BillSelect from "../../Other/Valuta/BillSelect";
import TransferService from "../../../../service/TransferService";

export const TransferBetween = observer(() => {
    const{bills, bill, billExcept, billTo, changeBillTo, changeBillExcept} = AccountStore

    const [sum, setSum] = useState('')
    const[error, setError] = useState(null)

    const [state, setState]  =useState('input')
    const [tfa, setTfa] = useState('')
    const [code, setCode]= useState('')

    const postPay = async (e)=>{
        e.preventDefault()
        if (!sum) {
            setError('Поле не может быть пустым')
            return;
        }
        if (sum.replace(',', '.') < 0.01) {
            setError(' ')
            return
        }
        try {
            const response = await TransferService.Transfer(sum.replace(',', '.'), bill, billTo,
                'Перевод между своими счетами')
            setTfa(response.data.tfa_token)
            setState('Confirm')
            setError(null)
            console.log(response.data)
        } catch (e) {
            setError(e.response.data)
        }
    }

    const Confirmation = async (e)=>{
        e.preventDefault()
        try {
            await TransferService.confirmTransfer(tfa, code)
            setError(null)
            setState('access')
        } catch (e) {
            setError(e.response.data)
        }
    }

    return (
        <div className="page_chr">
                {state === 'input' &&
                <div className='cardholder'>
                    <form onSubmit={(e)=>postPay(e)}>
                        <h1>Между своими счетами</h1>
                        <div className="cardFrom">
                            <p>Откуда</p>
                            {bills.length &&
                                <BillSelect bills={bills} bill={bill} onChange={value => changeBillExcept(value)}/>}

                            <div className="cardTo">
                                <p>Куда</p>
                                {billExcept.length &&
                                    <BillSelect bills={billExcept} bill={billTo}
                                                onChange={value => changeBillTo(value)}/>}
                            </div>
                        </div>
                        <div className="submition">
                            <CurrencyInput style={error && {borderColor: "blueviolet"}}
                                className='cin'
                                placeholder='Сумма..'
                                decimalsLimit={2}
                                defaultValue={sum}
                                allowNegativeValue={false}
                                onValueChange={(e) => setSum(e)}
                            />
                            {error && <span className='error'>{error}</span>}
                            <button className='myBtn'>Продолжить</button>
                        </div>
                    </form>
                </div>
            }
            {state === 'Confirm' &&
                <div className='cardholder'>
                    <h2>На Вашу почту отправлено письмо с кодом подтверждения</h2>
                     <input style={error && {borderColor: "blueviolet"}}
                            className='pay_input'
                            placeholder='Код подтверждения'
                            value={code}
                            onChange={(e)=>setCode(e.target.value)}
                     />
                    {error && <span className='error'>{error}</span>}
                    <button onClick={e=>Confirmation(e)} className='myBtn'>Подтвердить</button>
                </div>
            }
            {state === 'access' &&
                <div className='cardholder'>
                    <h1>Перевод выполнен</h1>
                    <p>Между своими счетами</p>
                    <h3>{bill}</h3>
                </div>

            }
        </div>
    );
});

export default TransferBetween;
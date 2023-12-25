import React, {useState} from 'react';
import '../../../styles/Common.css'
import './MoneyToSomewhere.css'
import CurrencyInput from "react-currency-input-field";
import {observer} from "mobx-react-lite";
import AccountStore from "../../../../store/AccountStore";
import BillSelect from "../../Other/Valuta/BillSelect";
import TransferService from "../../../../service/TransferService"
import {billFormat} from "../../../utils/Format";

export const TransferUser = observer(() => {
    const {bills, bill, changeBill} = AccountStore

    const [state, setState] = useState('chooseMan')
    const [error, setError] = useState(null)
    const [tfa, setTfa] = useState('')
    const [code, setCode] = useState('')

    const [billUser, setBillUser] = useState('')
    const [sum, setSum] = useState('')

    const checkBill = async (e) => {
        e.preventDefault()
        if (!billUser) {
            setError('Поле не может быть пустым');
            return;
        }
        if (billUser.length < 20) {
            setError('Неправильно введен номер счета');
            return;
        }
        try {
            const response = await TransferService.isClient(billUser.replace(/\s/g, ''))
            if (Boolean(response.data.has_account)) {
                setError(null)
                setState("chooseCard")
            } else {
                setError('Пользователя с таким счетом не существует')
            }
        } catch (error) {
            setError(error.response.data)
        }
    }

    const postPay = async (e) => {
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
            const response = await TransferService.Transfer(sum.replace(',', '.'), bill,
                billUser.replace(/\s/g, ''), 'Перевод клиенту банка')
            setTfa(response.data.tfa_token)
            setState('Confirm')
            setError(null)
            console.log(response.data)
        } catch (e) {
            setError(e.response.data)
        }
    }

    const Confirmation = async (e) => {
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
        <div className='page_chr'>
            {state === 'chooseMan' &&
                <div className='cardholder'>
                    <form onSubmit={(e) => checkBill(e)}>
                        <h1>Получатель</h1>
                        <p>Введите номер счета</p>
                        <input style={error && {borderColor: "blueviolet"}}
                               value={billUser}
                               className="cin"
                               type="text"
                               onChange={e => billFormat(e.target.value, setBillUser)}
                        />
                        {error && <span className='error'>{error}</span>}
                        <button className='myBtn'>Продолжить</button>
                    </form>
                </div>
            }
            {state === 'chooseCard' &&
                <div className='cardholder'>
                    <form onSubmit={(e) => postPay(e)}>
                        <h1>Детали перевода</h1>
                        <div className='cardFrom'>
                            <p>Откуда</p>
                            {bills.length &&
                                <BillSelect bills={bills} bill={bill} onChange={value => changeBill(value)}/>}
                        </div>
                        <CurrencyInput style={error && {borderColor: "blueviolet"}}
                                       className='cin'
                                       placeholder='Сумма..'
                                       decimalsLimit={2}
                                       required={true}
                                       allowNegativeValue={false}
                                       defaultValue={sum}
                                       onValueChange={(e) => setSum(e)}
                        />
                        {error && <span style={{color: "blueviolet"}}>{error}</span>}
                        <button className='myBtn'>Продолжить</button>
                    </form>
                </div>
            }
            {state === 'Confirm' &&
                <div className='cardholder'>
                    <h2>На Вашу почту отправлено письмо с кодом подтверждения</h2>
                    {error && <span>{error}</span>}
                    <input className='pay_input' placeholder='Код подтверждения'
                           value={code}
                           onChange={(e) => setCode(e.target.value)}
                    />
                    <button onClick={e => Confirmation(e)} className='myBtn'>Подтвердить</button>
                </div>
            }
            {state === 'access' &&
                <div className='cardholder'>
                    <h1>Перевод выполнен</h1>
                </div>
            }
        </div>
    );
});

export default TransferUser;


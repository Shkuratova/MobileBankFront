import React, {useEffect, useState} from 'react';
import './MoneyToSomewhere.css'
import './../../../styles/Common.css'
import CurrencyInput from "react-currency-input-field";
import {observer} from "mobx-react-lite";
import AccountStore from "../../../../store/AccountStore";
import TransferService from "../../../../service/TransferService";
import EmailConfirm from "../../../reUsePages/EmailConfirm";
import {BETWEEN, EMPTY_FIELD, SUM_ERROR, TRANSFER_EXECUTE} from "../../../../consts/StringConsts";
import Execute from "./Modal/Execute";
import getSymbolFromCurrency from "currency-symbol-map";
import ChooseBill from "./TransferSteps/ChooseBill";
import Loading from "../../../reUsePages/Loading";

export const TransferBetween = observer(() => {
    const{bills} = AccountStore

    const [sum, setSum] = useState('')
    const[error, setError] = useState(null)
    const[payBills, setPayBills] = useState([])
    const [payBill, setPayBill] = useState('')
    const[recieveBills, setRecieveBills] = useState([])
    const [recieveBill, setRecieveBill] = useState('')
    const [state, setState]  =useState('input')
    const [tfa, setTfa] = useState('')
    const [code, setCode]= useState('')


    useEffect(() => {
        if(bills.length !==0)
            setPayBills(bills.filter((c) => c.balance != 0 ||
                c.description.max_debt_amount > Math.abs(c.balance)))

    }, [bills]);

    useEffect(()=>{
        if(payBills.length !==0){
            setPayBill(payBills[0].account_number)
            setRecieveBills(bills.filter((c) =>
                c.account_number !== payBills[0].account_number))
        }
    }, [payBills])
    useEffect(()=>{
        if(recieveBills.length !==0)
            setRecieveBill(recieveBills[0].account_number)
    }, [payBill])

    const getCur=()=>{
        return  bills.filter((c) => c.account_number === payBill);
    }

    const onSubmitHandler = async (e)=>{
        e.preventDefault()
        if (!sum) {
            setError(EMPTY_FIELD)
            return;
        }
        if (sum.replace(',', '.') < 0.01) {
            setError(SUM_ERROR)
            return
        }
        try {
            setState('Load')
            const response = await TransferService.Transfer(sum.replace(',', '.'), payBill, recieveBill,
                BETWEEN)
            setTfa(response.data.tfa_token)
            setState('Confirm')
            setError(null)
            console.log(response.data)
        } catch (e) {
            setState('input')
            setError(e.response.data)
        }
    }

    const TransferConfirm = async (e)=>{
        e.preventDefault()
        try {
            setState('Load')
            await TransferService.confirmTransfer(tfa, code)
            setError(null)
            setState('access')
        } catch (e) {
            setState('Confirm')
            setError(e.response.data)
        }
    }

    return (
        <>
            {state ==='Load' &&
                <div className="row-direct cardholder info_box">
                    <Loading/>
                </div>
            }
                {state === 'input' &&
                <div className='cardholder info_box'>
                    <form onSubmit={onSubmitHandler}>
                        <h1>Между своими счетами</h1>
                        <ChooseBill
                            allBills={bills}
                            bill={payBill}
                            bills={payBills}
                            setBill={setPayBill}
                            setBillTo={setRecieveBill}
                            billTo={recieveBill}
                            billExcept={recieveBills}
                            setBillExcept={setRecieveBills}
                        />
                        <div className="submition">
                            <CurrencyInput
                                className={error?"myInput error--input": "myInput"}
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
                    <EmailConfirm
                        code={code}
                        setCode={setCode}
                        confirm={TransferConfirm}/>
            }
            {state === 'access' &&
                <Execute
                    title={TRANSFER_EXECUTE}
                    type={BETWEEN} to={recieveBill}
                    from={payBill}
                    sum={sum + getSymbolFromCurrency(getCur()[0].currency)}/>
            }
        </>
    );
});

export default TransferBetween;
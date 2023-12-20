import React, {useState} from 'react';
import '../../../styles/Common.css'
import CardList from "../../Home/CardList";
import './MoneyToSomewhere.css'
import {useForm} from "react-hook-form";
import Execute from "./Modal/Execute";
import Confirm from "./Modal/Confirm";
import CurrencyInput from "react-currency-input-field";
import {cardFormat} from "../../../utils/Format";
import CardSelect from "./CardSelect";

const ToOther = () => {
    const {
        handleSubmit,
        register,
        formState:{errors},
    } = useForm({mode:"onChange"});
    const Submit = ()=>{
        setState("chooseCard")
    }
    const [state, setState] = useState('chooseMan')
    const[cards, setCards] = useState([
        {id:1,cardType:'Дебетовая карта', cardNum:'123', balance:'11000.20'},
        {id:2,cardType:'Кредитная карта', cardNum:'253', balance:'1500.12'},
        {id:3,cardType:'Дебетовая карта', cardNum:'188', balance:'250000.65'}
    ]);
    const[bill, setBill] = useState('')
    const sendDuty =()=>{
        setState('confirmation')
    }
    const [card, setCard] = useState(String(cards[0].id))

    const[sum, setSum] = useState('')


    return (
        <div className='page_chr'>
            <CardList/>
                {state==='chooseMan' &&
                    <div className='cardholder'>
                     <form onSubmit={handleSubmit(Submit)}>
                    <h1>Получатель</h1>
                    <p>Введите номер счета</p>
                    <input
                        value={bill}
                        className={[errors.name, "cin"].join(" ")}
                        type="text"
                        {...register("name",{
                            required:true,
                            minLength:19
                        })}
                        onChange={e=>cardFormat(e, setBill)}
                    />
                         {errors.name?.type==="required" && <span style={{color:'red'}}>Поле не может быть пустым</span>}
                         {errors.name?.type==="minLength" && <span style={{color:'red'}}>Неверно введен номер карты</span>}
                    <button className='myBtn'>Продолжить</button>
                </form>
                    </div>
                }
                {state ==='chooseCard' &&
                    <div className='cardholder'>
                    <form onSubmit={sendDuty}>
                        <h1>Детали перевода</h1>
                        <div className='cardFrom'>
                            <p>Откуда</p>
                           <CardSelect cards={cards} card={card} onChange={value=>setCard(value)}/>
                        </div>
                        <CurrencyInput
                            className={[errors.name,'cin'].join(' ')}
                            placeholder='Сумма..'
                            decimalsLimit={2}
                            required={true}
                            defaultValue={sum}
                            onValueChange={(e)=>setSum(e)}
                        />
                            <button className='myBtn'>Продолжить</button>
                    </form>
                    </div>
                }
            {state==='confirmation' &&
                <Confirm status={state} setStatus={setState}/>
            }
            {state==='access' &&
                <Execute
                    title={'Перевод выполнен'}
                    txt1={bill}
                    txt2={sum}/>
            }
        </div>
    );
};

export default ToOther;


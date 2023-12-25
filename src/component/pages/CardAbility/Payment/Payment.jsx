import React from 'react';
import '../../../styles/Common.css'
import '../../GetItemById/idElements.css'
import './PaymentElem.css'
import Action from "../../../reUse/Action";

const Payment = () => {
    return (
        <div className='page_chr'>
            <div className="pay_main">
                <div className="pay_btn">
                    <h1 style={{marginLeft:"2%"}}>Переводы</h1>
                    <Action
                        path={'/payment/transfer/user'}
                        img={'/images/crowd.png'}
                        width={'60'}
                        height={'60'}
                        name={'Другому человеку'}/>
                    <Action
                        path={'/payment/transfer/between'}
                        img={'/images/transact.png'}
                        width={'60'}
                        height={'60'}
                        name={'Между своими'}/>
                </div>
                <div className='pay_btn'>
                    <h1 style={{marginLeft:"2%"}}>Платежи</h1>
                    <Action
                        path={'/payment/service'}
                        img={'/images/plus.png'}
                        width={'60'}
                        height={'60'}
                        name={'Оплатить услугу'}/>
                </div>
            </div>
        </div>
    );
};

export default Payment;
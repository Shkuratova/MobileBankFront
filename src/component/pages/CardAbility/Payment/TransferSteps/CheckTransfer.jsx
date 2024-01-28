import React from 'react';
import {billFormat} from "../utils";
const CheckTransfer = ({from, to, sum, setState}) => {


    return (
        <div className='check_operation info_box'>
            <div onClick={()=>setState('chooseCard')}
                className="back--btn"></div>
            <div className="transferData">
                <h2>Подтверждение операции</h2>
                <br/>
                <p className="chek_p">Откуда</p>
                <input style={{color: "#212121"}} className="myInput"
                       value={billFormat(from)}
                       disabled={true}
                />
                <p className="chek_p">Куда</p>
                <input style={{color: "#212121"}}
                       className="myInput"
                       value={billFormat(to)}
                       disabled={true}
                />
                <p className="chek_p">Сколько</p>
                <input
                    style={{color: "#212121"}}
                    className="myInput"
                    value={sum}
                    disabled={true}/>
                <button onClick={() => setState('Confirm')}
                        className="myBtn">Подтвердить
                </button>
            </div>
        </div>
    );
};

export default CheckTransfer;
import React from 'react';
import './Other.css'
const AtmItem = (props) => {
    return (
        <div className="atm__i">
            <div style={{width:"100%", marginTop:"8%"}}>
                <div  className="mark">
                    <div style={{width:"38px",height:"38px", borderRadius:"50%", background:"white"}}>
                    </div>
                </div>
            </div>
            <div style={{marginLeft:"5%", width:"100%"}}>
                <h3>Банкомат №{props.atm.id}</h3>
                <p>{props.atm.address}</p>
            </div>
            <div style={{float:"right", marginLeft:"5%", padding:"2%", width:"60%"}}>
                <h4>Ежедневно</h4>
                <p>C {props.atm.time} до {props.atm.timeEnd}</p>
            </div>
        </div>
    );
};

export default AtmItem;
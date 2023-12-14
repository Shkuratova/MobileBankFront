import React from 'react';
import '../MoneyToSomewhere.css'
const Execute = (props) => {
    return (
        <div className="access">
            <h1>{props.title}</h1>
            <h2 style={{color:"gray", marginTop:"2%"}}>{props.txt1}</h2>
            <h2 style={{marginTop:"2%"}}>{props.txt2} Р</h2>
            <h2 style={{marginTop:"2%", color:"gray"}}>{props.description}</h2>
        </div>
    );
};

export default Execute;
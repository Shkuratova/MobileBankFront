import React from 'react';
import '../defaultUI.css'
const Input = ({setValue, value, error, text}) => {
    return (
        <input
            className={error?"myInput error--input":"myInput"}
            onChange={e=>setValue(e.target.value)}
            placeholder={text}
            value={value}
        />
    );
};

export default Input;
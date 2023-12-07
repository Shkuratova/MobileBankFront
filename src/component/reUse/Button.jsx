import React from 'react';
import './buttons.css'
const Button = ({children, ...props}) => {
    return (
        <button {...props} className="myBtn">
            {children}
        </button>
    );
};

export default Button;
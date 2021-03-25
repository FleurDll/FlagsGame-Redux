import React from "react";

const Button = ({ onButtonClick, buttonText, customClass }) => {
    return (
        <button
            onClick={onButtonClick}
            className={`ui primary button ${customClass}`}>
            {buttonText}
        </button>
    );
};

export default Button;
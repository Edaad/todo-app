import React from 'react';

const Alert = ({ message, firstButton, secondButton, firstButtonFunction, secondButtonFunction }) => {
    return (
        <>
            <span>{message}</span>
            <button onClick={firstButtonFunction}>{firstButton}</button>
            <button onClick={secondButtonFunction}>{secondButton}</button>
        </>
    );
};

export default Alert;
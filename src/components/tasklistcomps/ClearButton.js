import React from "react";

const ClearButton = ({ setTodoList }) => {

    const handleClearClick = () => {
        setTodoList([]);
    }

    return (
        <button className="clear-button" onClick={handleClearClick}>Clear</button>
    )
}

export default ClearButton; 
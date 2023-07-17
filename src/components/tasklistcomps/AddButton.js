import React from "react";

const AddButton = ({ text, setText, todoList, setTodoList }) => {

    const handleAddClick = () => {
        if (!text) {
            return;
        }

        const todo = {
            id: "$" + text,
            text: text,
            status: '1',
            date: null,
            note: null,
        }

        setTodoList([...todoList, todo]);
        setText("");
    }

    return (
        <button className="add-button" onClick={handleAddClick}>Add</button>
    )
}

export default AddButton;
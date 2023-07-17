import React from "react";

const TextField = ({ text, setText, todoList, setTodoList }) => {

    const handleInputChange = (event) => {
        setText(event.target.value);
    }

    const handleEnter = (event) => {
        const key = event.key;
        if (key === "Enter") {
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
    }

    return (
        <input autoComplete="off" className="text-field" value={text} name="todo" type="text" placeholder="Add task" onChange={handleInputChange} onKeyDown={(event) => { handleEnter(event) }} />
    )
}

export default TextField;
import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Dropdown = ({ todo, todoList, setTodoList }) => {
    const [date, setDate] = useState(todo.date && new Date(todo.date));
    const [note, setNote] = useState(todo.note);

    const handleSave = (id) => {
        const newtodoList = todoList.map((todo) => {
            const _todo = { ...todo };

            if (_todo.id === id) {
                _todo.note = note;
                _todo.date = date;
            }

            return _todo;
        });

        setTodoList(newtodoList);
    }

    const textAreaAdjust = (event) => {
        event.target.style.height = "1px";
        event.target.style.height = (event.target.scrollHeight) + "px";
    }

    return (
        <div className="dropdown-container">
            <div>
                <DatePicker value={date} className="date-picker" selected={date} placeholderText="Add date" onChange={(date) => { setDate(date) }} />
                {date !== null && <button className="remove-date" onClick={() => { setDate(null) }}>×</button>}
            </div>
            <div><textarea value={note} className="task-notes" placeholder="Add notes" onChange={(event) => { setNote(event.target.value) }} onKeyUp={textAreaAdjust} /></div>
            <button className="save-button" onClick={() => handleSave(todo.id)}>Save</button>
        </div>
    )
}

export default Dropdown;
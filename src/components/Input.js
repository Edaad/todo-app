import React from "react";

const Input = ({ name, onChange, placeholder, type, label, indicator, notEmpty, value, style }) => {

  const green = "#65c568";
  const red = "#ff4a4a";

  const indicatorStyle = {
    active: { backgroundColor: green },
    inactive: { backgroundColor: red },
  };

  return (
    <div className="inputfield">
      <div className="input-details" style={style}>
        <label style={{ margin: "8px", fontSize: "12px", fontWeight: "bold", color: "#585858" }} htmlFor={name}> {label} </label> <br />
        <input
          className="input"
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </div>
      {notEmpty && <div className="indicator2" style={indicator ? indicatorStyle.active : indicatorStyle.inactive}></div>}
    </div>
  );
};

export default Input;

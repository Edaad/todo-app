import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loggedinUser } from "../actions/loginActions";
import Input from "../components/Input";
import todopic from "../formart/todo.jpg"

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users } = useSelector((state) => state.allUsers);

  const [currentUser, setCurrentUser] = useState({});
  const [validAcc, setValidAcc] = useState();

  const handleLoginClick = (event) => {
    event.preventDefault();

    users.map((user) => {
      let output;
      if (
        user.username === currentUser.username &&
        user.password === currentUser.password
      ) {
        setValidAcc(true);
        output = console.log("Successful Login");
        dispatch(loggedinUser(currentUser.username));
        // dispatch(isLoggedIn(validAcc));
        navigate("/dashboard");
      } else {
        setValidAcc(false);
        // dispatch(isLoggedIn(validAcc));
        output = console.log("Incorrect username or password");
      }

      return output;
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setCurrentUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  return (
    <>
      <div className="all-form">
        <div className="form-field">
          <h1 className="form-title">Login</h1>

          <div className="input-block">
            <form onSubmit={handleLoginClick}>
              <Input
                name="username"
                type="text"
                label="Username"
                placeholder="Enter your username..."
                onChange={onChangeHandler}
              />

              <Input
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password..."
                onChange={onChangeHandler}
              />

              {validAcc === false && <div style={{ color: "#ff4a4a", marginBottom: "5px" }}>Incorrect username or password</div>}

              <button className="submit-button" type="submit">Login</button>
            </form>
            <span className="form-change">Don't have an account? <Link to="/signup">Sign up</Link></span>
          </div>
        </div >
        <img src={todopic} className="form-pic" alt="todpic"></img>
      </div >
    </>
  );
}

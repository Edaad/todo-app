import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../actions/signupActions";
// import Indicator from "../components/Indicator";
import todopic from "../formart/signup.jpg"


export function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users } = useSelector((state) => state.allUsers);
  const [user, setUser] = useState({});
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
      email: "",
    }));


    setUsernameValid(true);
    if (name === "username") {
      users.map(user => {
        console.log(user.username, value);
        if (user.username === value) {
          setUsernameValid(false);
        }
      });
    }


  };

  const confirmHandler = (event) => {
    if (event.target.value === user.password) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (usernameValid && passwordValid) {
      dispatch(addUser(user));
      navigate("/");
    } else if (!usernameValid) {
      alert("Username is already taken");
    } else if (usernameValid && !passwordValid) {
      alert("Passwords don't match");
    }
  };

  return (
    <div className="all-form">
      <div className="form-field">
        <h1 className="form-title">Sign up</h1>

        <div className="input-block">
          <form onSubmit={onSubmitHandler}>
            <Input
              name="name"
              type="text"
              label="Full Name"
              placeholder="Enter your name"
              onChange={onChangeHandler}
            />

            <Input
              name="username"
              type="text"
              label="Username"
              placeholder="Create a username"
              onChange={onChangeHandler}
              notEmpty={user.username}
              indicator={usernameValid}
            />

            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Create a password"
              onChange={onChangeHandler}
            />

            <Input
              name="confirm-password"
              type="password"
              label="Confirm Password"
              placeholder="Re-type password"
              onChange={confirmHandler}
              notEmpty={user.password}
              indicator={passwordValid}
            />

            <button className="submit-button" type="submit">Create Account</button>
          </form>
          <span className="form-change">Already have an account? <Link to="/">Log in</Link></span>
        </div>
      </div>
      <img src={todopic} className="signup-pic" alt="todpic"></img>
    </div>
  );
}

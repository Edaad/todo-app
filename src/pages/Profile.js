import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedinUser } from "../actions/loginActions";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import profilepic from "../formart/profilepic.png"

export function Profile() {

  const { users } = useSelector((state) => state.allUsers);
  const { username } = useSelector((state) => state.currentUser);
  const currentUsername = username;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = users.map((user) => {
    if (user.username === currentUsername) {
      return user;
    }
  });

  const currentUserData = userData.filter(user => user !== undefined)[0];

  const [changeUserData, setChangeUserData] = useState({ name: currentUserData.name, username: currentUserData.username, password: currentUserData.password, email: currentUserData.email });
  const [showEdit, setShowEdit] = useState();
  const [usernameValid, setUsernameValid] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setChangeUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setUsernameValid(true);
    if (name === "username") {
      users.map(user => {
        console.log(user.username, value);
        if (user.username === value && user.username !== currentUsername) {
          setUsernameValid(false);
        }
      });
    }
  }

  const handleSave = () => {
    users.map((user) => {
      if (user === currentUserData) {
        dispatch(loggedinUser(changeUserData.username));
        const prevUsername = user.username;
        user.name = changeUserData.name;
        user.username = changeUserData.username;
        user.password = changeUserData.password;
        user.email = changeUserData.email;
        localStorage.setItem("users", JSON.stringify(users));
        if (prevUsername !== user.username) {
          localStorage.setItem(user.username, localStorage.getItem(prevUsername));
          localStorage.removeItem(prevUsername);
        }
      }
    })

  }

  const handleCancel = (currentUserData) => {
    setChangeUserData(currentUserData);
  }

  return (
    <>
      <nav className="topnav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <h1 style={{ textAlign: "center" }}>Profile</h1>
      <div className="profile-container">

        {!showEdit && <div className="display-profile">
          <img style={{ width: "70px", height: "70px" }} src={profilepic} alt="No Profile Pic" />
          <div style={{ display: "flex", flexDirection: "column", marginLeft: "-50px", marginTop: "4px" }}>
            <span style={{ fontSize: "22px" }}> {changeUserData.name} </span>
            <span> {changeUserData.username} </span>
            <div >
              {currentUserData.email && <span style={{ color: "gray", fontStyle: "italic", fontSize: "13px" }}> {changeUserData.email} </span>}
              {!currentUserData.email && <span style={{ color: "gray", fontStyle: "italic", fontSize: "13px" }}>Email not added</span>}
            </div>

          </div>
          <button style={{ width: "60px", marginLeft: "auto" }} onClick={() => { setShowEdit(true) }}>Edit</button>
        </div>}



        {showEdit && <div className="edit-profile">

          <div>
            <Input style={{ flexDirection: "row" }} label="Name" name="name" onChange={handleChange} value={changeUserData.name} />
          </div>

          <div>
            <Input label="Username" name="username" onChange={handleChange} value={changeUserData.username} indicator={usernameValid} notEmpty={changeUserData.username} />
          </div>

          <div>
            <Input label="Email" type="email" name="email" onChange={handleChange} value={changeUserData.email} />
          </div>

          <div>
            <button>Change Password</button>
          </div>
          <button onClick={() => { handleCancel(currentUserData); setShowEdit(false) }}>Cancel</button>
          <button onClick={() => { handleSave(); setShowEdit(false) }}>Update Profile</button>


        </div>}

        <button style={{ marginTop: "30px" }} onClick={() => { dispatch(loggedinUser("")); navigate("/"); }}>Logout</button>

      </div >
    </>
  );
}

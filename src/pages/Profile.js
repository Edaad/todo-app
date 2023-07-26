import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedinUser } from "../actions/loginActions";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import profilepic from "../formart/profilepic.png"
import { deleteUser } from "../actions/signupActions";
import Alert from "../components/Alert";

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
  const [showChangePassword, setShowChangePassword] = useState();
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(false);
  const [oldPasswordValid, setOldPasswordValid] = useState(false);
  const [newPassword, setNewPassword] = useState();
  const [saveValid, setSaveValid] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setChangeUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "password") {
      setNewPassword(value);
      console.log(value);
    }

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

    setNewPassword(null);
    setPasswordValid(false);
  }

  const handleCancel = (currentUserData) => {
    setChangeUserData(currentUserData);
  }

  const handlePasswordCancel = () => {
    setNewPassword(null);
    setPasswordValid(false);
    changeUserData.password = currentUserData.password;
    setSaveValid(true);
  }

  const confirmHandler = (event) => {
    if (event.target.value === newPassword) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const handleOldPassword = (event) => {
    if (event.target.value === currentUserData.password) {
      setOldPasswordValid(true);
    } else {
      setOldPasswordValid(false);
    }
  }

  const handleDeleteUser = () => {
    localStorage.removeItem(currentUserData.username);
    dispatch(deleteUser(currentUserData));
    navigate("/");
  }

  return (
    <>
      <nav className="topnav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <h1 style={{ textAlign: "center" }}>Profile</h1>
      <div className="profile-container">

        {!showEdit && !showChangePassword && !showAlert && <div>
          <div className="display-profile">
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

          </div>
          <div>
            {!showAlert && <button className="logout" onClick={() => { dispatch(loggedinUser("")); navigate("/"); }}>Logout</button>}
            {!showAlert && <button className="delete" onClick={() => { setShowAlert(true) }}>Delete Account</button>}
          </div >
        </div>}
        {showAlert && <div className="alert">
          <div style={{ fontSize: "18px", textAlign: "center" }}>Are you sure you want to delete your account?</div>
          <div className="alert-buttons">
            <button className="alert-button" onClick={() => { handleDeleteUser() }}>Yes</button>
            <button className="alert-button" onClick={() => { setShowAlert(false) }}>No</button>
          </div>
        </div>}

        {showEdit && <div className="edit-profile">

          <div className="edit-buttons">
            <button className="cancel-button" onClick={() => { handleCancel(currentUserData); setShowEdit(false) }}>CANCEL</button>
            <button className="update-button" onClick={() => { usernameValid && handleSave(); usernameValid && setShowEdit(false) }}>UPDATE</button>
          </div>

          <div>
            <Input label="Name" name="name" onChange={handleChange} value={changeUserData.name} />
          </div>

          <div>
            <Input label="Username" name="username" onChange={handleChange} value={changeUserData.username} indicator={usernameValid} notEmpty={changeUserData.username} />
          </div>

          <div>
            <Input label="Email" type="email" name="email" onChange={handleChange} value={changeUserData.email} />
          </div>

          <div>
            <button onClick={() => { setShowChangePassword(true); setShowEdit(false) }}>Change Password</button>
          </div>



        </div>}

        {showChangePassword && <div className="edit-password">

          <div className="edit-buttons">
            <button className="cancel-button" onClick={() => { handlePasswordCancel(); setShowEdit(true); setShowChangePassword(false) }}>CANCEL</button>
            <button className="update-button" onClick={() => { (passwordValid && oldPasswordValid) && setSaveValid(true); (!passwordValid || !oldPasswordValid) && setSaveValid(false); (passwordValid && oldPasswordValid) && handleSave(); passwordValid && oldPasswordValid && setShowEdit(true); passwordValid && oldPasswordValid && setShowChangePassword(false) }}>UPDATE</button>
          </div>

          <div>
            <Input label="Old Password" name="old-password" type="password" placeholder="Enter your old password" onChange={handleOldPassword} />
          </div>

          <div>
            <Input label="New Password" name="password" type="password" placeholder="Enter your new password" onChange={handleChange} />
          </div>

          <div>
            <Input label="Confirm New Password" name="confirm-password" type="password" placeholder="Re-type your new password" onChange={confirmHandler} notEmpty={newPassword}
              indicator={passwordValid} />
          </div>

          {!saveValid && <span style={{ color: "#ff4a4a", fontSize: "13px" }}>One or more fields are invalid</span>}
        </div>}



      </div >
    </>
  );
}

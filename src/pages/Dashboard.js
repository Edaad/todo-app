import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { React } from "react";
import Tasklist from "../components/TaskList";

export function Dashboard() {
  let fullName;

  const { username } = useSelector((state) => state.currentUser);
  const { users } = useSelector((state) => state.allUsers);

  users.map((user) => {
    if (user.username === username) {
      fullName = user.name;
    }
  });
  return (
    <>
      <nav className="topnav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <ul>
        <li><a className="active" href="#home">Home</a></li>
        <li><a href="">Today</a></li>
        <li><a href="">Upcoming</a></li>
        <li><a href="">Completed</a></li>
      </ul>
      <div className="dashboard-main">
        <div className="title">Welcome, {fullName}</div>
        <Tasklist className="tasklist" />
      </div>


    </>
  );
}

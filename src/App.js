import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { Dashboard } from "./pages/Dashboard";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users?search=hello', {
      method: 'GET'
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      }).catch((err) => {
        console.log(err)
      })
    // fetch('https://jsonplaceholder.typicode.com/users', {
    //   method: 'POST'
    // })

  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

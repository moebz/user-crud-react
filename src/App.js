import React, { useState, useEffect } from "react";
import { Login } from "./Login";
import { Home } from "./Home";
import { Landing } from "./Landing";
import { Routes, Route, Link } from "react-router-dom";
import AuthService from "./auth.service";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    console.log("App.useEffect.user", user);
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <>
      {currentUser ? (
        <div>
          <li>
            <Link to={"/profile"}>Current user: {currentUser.username}</Link>
          </li>
          <li>
            <a href="/login" onClick={logOut}>
              Log out
            </a>
          </li>
        </div>
      ) : (
        <div>
          <li>
            <Link to={"/login"}>Log in</Link>
          </li>
        </div>
      )}
      <div>
        <Routes>
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

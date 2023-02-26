import React, { useState, useEffect } from "react";
import { Login } from "./Login";
import { Home } from "./Home";
import { Landing } from "./Landing";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import AuthService from "./auth.service";

const AppLayout = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [textoDePrueba, setTextoDePrueba] = useState('gorbachov');

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    console.log("App.useEffect.user", user);
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(null);
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
      {textoDePrueba}
      <Outlet context={{ setCurrentUser, setTextoDePrueba }} />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<AppLayout />}
        >
          <Route
            path="/login"
            element={<Login />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

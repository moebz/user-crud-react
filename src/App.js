import React, { useState, useEffect } from "react";
import { Login } from "./Login";
import { Home } from "./Home";
import { Landing } from "./Landing";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { authService } from "./authService";
import { history } from "./history";
import { RequireAuth } from "./RequireAuth";
import { Users } from "./Users";
import { ResponsiveAppBar } from "./ResponsiveAppBar";

function App() {
  // Init custom history object to allow navigation from
  // anywhere in the react app (inside or outside components).
  history.navigate = useNavigate();
  history.location = useLocation();

  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    console.log("App.useEffect.user", user);
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    setCurrentUser(null);
    setCurrentUserData(null);
    authService.logoutAndRedirectToLogin();
  };

  console.log("App.render.currentUser", currentUser);

  return (
    <>
      <ResponsiveAppBar
        currentUser={currentUser}
        currentUserData={currentUserData}
        logOut={logOut}
      />

      <Routes>
        <Route
          path="/login"
          element={
            <Login
              setCurrentUser={setCurrentUser}
              setCurrentUserData={setCurrentUserData}
            />
          }
        />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;

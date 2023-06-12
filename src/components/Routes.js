import React from "react";
import { Routes as RRDRoutes, Route } from "react-router-dom";

import { Login } from "./../pages/Login";
import { Home } from "./../pages/Home";
import { Landing } from "./../pages/Landing";
import { Users } from "./../pages/Users";
import { RequireAuth } from "./RequireAuth";

function Routes({ setCurrentUser, setCurrentUserData }) {
  return (
    <RRDRoutes>
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
    </RRDRoutes>
  );
}

export default Routes;

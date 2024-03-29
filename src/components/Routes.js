import React from "react";
import { Routes as RRDRoutes, Route } from "react-router-dom";

import { LoginPage } from "./../pages/LoginPage";
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
          <LoginPage
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

import React from "react";
import { Routes as RRDRoutes, Route } from "react-router-dom";

import { RequireAuth } from "./RequireAuth";

import { LoginPage } from "./../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { LandingPage } from "../pages/LandingPage";
import { UsersPage } from "../pages/UsersPage";

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
            <HomePage />
          </RequireAuth>
        }
      />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/" element={<LandingPage />} />
    </RRDRoutes>
  );
}

export default Routes;

import React from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { UserProfile } from "../components/auth/Profile";
import ResponsiveDrawer from "../components/appbar/AppBar";

export function LoginPage() {
  return <Login />;
}

export function RegisterPage() {
  return <Register />;
}

export function ProfilePage() {
  return (
    <div>
      <ResponsiveDrawer>
        <UserProfile />
      </ResponsiveDrawer>
    </div>
  );
}

'use client';

import React from "react";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function Home() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  console.log("user", user);
  
  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
      <span>Welcome, {user && (user.name || user.email)}</span>
      </div>
    </React.Fragment>
  );
}

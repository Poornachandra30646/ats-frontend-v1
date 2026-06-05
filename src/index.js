import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import {
  GoogleOAuthProvider
} from "@react-oauth/google";

import {
  ResumeProvider
} from "./context/ResumeContext";

const root =
  ReactDOM.createRoot(
    document.getElementById("root")
  );

root.render(

  <GoogleOAuthProvider
    clientId="1074010339446-80t97bdhi7g7f7fu3cm52qohek8fnldj.apps.googleusercontent.com"
  >

    <ResumeProvider>

      <App />

    </ResumeProvider>

  </GoogleOAuthProvider>

);
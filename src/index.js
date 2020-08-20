import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  // Paste your config object here. Get from your Firebase db
  apiKey: "AIzaSyDtZucVImVgHST_2psD6aukhxGakFFQEMk",
  authDomain: "pinkgames-4d83b.firebaseapp.com",
  databaseURL: "https://pinkgames-4d83b.firebaseio.com",
  projectId: "pinkgames-4d83b",
  storageBucket: "pinkgames-4d83b.appspot.com",
  messagingSenderId: "366915913423",
  appId: "1:366915913423:web:a9c71539e0c762859299ba",
  measurementId: "G-X2B3XZQSWX",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(<App />, document.getElementById("app"));

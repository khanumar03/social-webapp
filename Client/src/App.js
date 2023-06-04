import React, { useEffect } from "react";
import "./App.css";
import Authentication from "./Components/AuthComponents/Authentication";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./Components/screens/Home";
import { useSelector, useDispatch } from "react-redux";
import { baseURL } from "./auth/axios";

const App = () => {
  const { User } = useSelector((state) => state);
  const Navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user_Token") && !User) {
      return Navigate("/Authentication", { replace: true });
    } else if (localStorage.getItem("user_Token")) {
      return Navigate("/home", { replace: true });
    }
  }, []);

  useEffect(() => {
    if(User) {
      document.title = "@" + User.userName + " - " + "InstaBook"
      return
    }
      document.title = "Instabook"
  },[])

  return (
    <div className="app">
      <Routes>
        <Route path="/Authentication" element={<Authentication />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;

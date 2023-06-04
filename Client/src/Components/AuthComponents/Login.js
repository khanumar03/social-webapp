import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../auth/axios";
import "./Style.css";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();


  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await baseURL({
      method: "post",
      url: "/login",
      data: {
        email: email,
        password: password,
      },
    })
      .then((saved) => {
        if (saved) {
          setEmail("");
          setPassword("");
          localStorage.setItem("user_Token", saved.data.token);
          history("/home", { replace: true });
          toast({
            title: "Welcome Back",
            description: "Login Successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        toast({
          title: "oOps!",
          description: "Email And Password Do Not Match",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        console.log(err);
      });
  };
  return (
    <div className="login">
      <form className="form-login" onSubmit={handleSubmit}>
        <label htmlFor="Email">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginbtn">Log in</button>
      </form>
      <p className="F-p">Forgotten Password ?</p>
      <div className="btn-box" onClick={props.signup}>
        <button className="btn-SignUp">Create new account</button>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { baseURL } from "../../auth/axios";
import "./Style.css";
import { useNavigate } from "react-router-dom"
import { useToast } from "@chakra-ui/react";

const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const history = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await baseURL({
      method: "post",
      url: "/signup",
      data: {
        userName: name,
        email: email,
        password: password,
      },
    })
      .then((saved) => {
        if (saved) {
          setName("");
          setEmail("");
          setPassword("");
          props.log(true)
          props.Sig(false)
          toast({
            title: "Thank your For Joining Instabook",
            description: "Signup Successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
        // console.log(saved.data);
      })
      .catch((err) => {
        toast({
          title: "oOps",
          description: "Email Already Exist or Fill The Information Correctly",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        // console.log(err);
      });
  };

  return (
    <div className="signup">
      <form className="form-signup" onSubmit={handleSubmit}>
        <label htmlFor="Name">userName</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button className="signupbtn">Sign up</button>
      </form>
      <div className='btn-box' onClick={props.login}>
        <button className='btn-SignUp'>Already have account ?</button>
        </div>
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import style from "styled-components";
import Login from "./Login";
import Signup from "./Signup";
import "./Style.css";

const Authentication = () => {
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);

  const loginCondition = () => {
    setLogin(true);
    setSignup(false);
  };

  const signupCondition = () => {
    setLogin(false);
    setSignup(true);
  };

  return (
    <AuthComponent className="Auth">
      <LeftAuthComponent className="left-com">
        <Title>Instabook</Title>
        <Info>
          Instabook helps you connect and share with the people in your life.
        </Info>
      </LeftAuthComponent>

      {/*                             */}

      <RightAuthComponent className="right-com">
        <LoginSignupScreen>
          <ButtonLs>
            <span className={login ? "slider left" : "slider right"}></span>
            <Btnl className={login ? "color" : ""} onClick={loginCondition}>
              Log in
            </Btnl>
            <Btns className={signup ? "color" : ""} onClick={signupCondition}>
              Sign up
            </Btns>
          </ButtonLs>
          <Authui>
            {login ? (
              <Login signup={signupCondition} />
            ) : (
              <Signup login={loginCondition} log={setLogin} Sig={setSignup} />
            )}
          </Authui>
        </LoginSignupScreen>
      </RightAuthComponent>
    </AuthComponent>
  );
};

export default Authentication;

const AuthComponent = style.div`
 position: relative;
 display:flex;
 height: 100vh;
 width:100vw;
 background:#f0f2f5;
`;

const LeftAuthComponent = style.div`
 position: relative;
 width:50%;
 height:100%;
 display:flex;
 flex-direction:column;
 justify-content: center;
 margin-left:120px;

 @media only screen and (max-width: 1200px) {
 display:none   
}
`;

const RightAuthComponent = style.div`
 position: relative;
 width:50%;
 height:100%;
 display:flex;
 justify-content: center;
 align-items:center;

 @media only screen and (max-width: 1200px) {
  width:100%   
 }
`;

const Title = style.span`
 position:relative;
 text-align:left;
 font-size:70px;
 font-weight: 700;
 color: #1877f2;
 font-family: 'Grandstander', cursive;
`;
const Info = style.span`
 position:relative;
 top: -20px;
 text-align:left;
 font-size:20px;
 font-weight: 600;
 color: #000;
 font-family: 'Grandstander', cursive;
`;

const LoginSignupScreen = style.div`
 position: relative;
 width:70%;
 min-height:50%;
 border-radius: 4px;
 background: #fff;
 padding:20px;
 box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;

 @media only screen and (max-width: 1200px) {
  width:80%  
 }
`;

const ButtonLs = style.div`
position:relative;
width:100%;
height:46px;
display:flex;
background:#fff;
margin-bottom:20px;
`;

const Btnl = style.span`
 position:relative;
 width:50%;
 height:100%;
 cursor:pointer;
 display:flex;
 justify-content: center;
 align-items:center;
 font-size:23px;
 font-weight:600;
`;
const Btns = style.span`
 position:relative;
 width:50%;
 height:100%;
 cursor:pointer;
 display:flex;
 justify-content: center;
 align-items:center;
 font-size:23px;
 font-weight:600;
`;

const Authui = style.div`
 position: relative;
 min-width:100%;
 min-height: 350px;
 border-radius: 5px;
`;

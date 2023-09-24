import React, { useState } from "react";
import SignInWEmail from "../components/SignUpAndSignInPopUps/SignInWEmail";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import log from "../helpers/logging";



const SignIn = () => {
  const [emailLoginForm, setEmailLoginForm] = useState(false);
  const navigate = useNavigate();

  const google = () => {
    window.open(process.env.REACT_APP_WINDOWKEY, "_self");
    <Navigate to="/feed" />;
  };

  return (
    <div className="bg-white flex flex-col h-screen">
      {/* <header className="m-5 bg-white font-bold text-xl" onClick={() => { navigate("/");}}>TEAM FORWARD</header> */}
      <div className="h-screen bg-white relative flex flex-col space-y-10 justify-center items-center">
        <div className="bg-white shadow-none flex flex-col justify-center items-center rounded p-6 w-80">
          <div className="bg-white shadow-none flex flex-col justify-center items-center rounded p-6 w-80">
            <h1 className="text-3xl font-bold leading-normal mb-3">LOG IN</h1>
            <SignInWEmail />
            <div className="mb-6 flex items-center justify-between"></div>
            <a href="/signup" className="p-1 underline">
              Don't have an account yet?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

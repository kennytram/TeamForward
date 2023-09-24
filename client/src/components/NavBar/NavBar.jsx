
import { Link, NavLink } from "react-router-dom";
import Button from "../../components/Button/BasicButtonStyling";
import NavMenu from "../NavMenu/NavMenu";
import { useEffect, useState } from "react";

import blankProfileImg from "../../assets/home/blank-profile.png";
import axios from "axios";


function NavBar({ user }) {
  const loggedin = user

  //added
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState();
  const dropDown = () => {
    setOpen(!open);
  };
  const displayNotifications = (unreadCount) => {
    if (unreadCount > 0) {
      return (
        <div
          style={{ marginTop: "-20px" }}
          className="absolute z-50 w-5 h-5 bg-amber-300 container mx-auto rounded-full "
        >
          <p className="text-sm text-slate-950 font-bold text-center">
            {unreadCount}
          </p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/messaging/user/message/unreadCount`)
      .then((res) => {
        setUnreadCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //end


  return (
    <nav style={{height : '56px'}} className="navbar navbar-expand-lg border-b-2 border-gray-350 py-2 bg-white relative flex items-center w-full justify-evenly">
      <div
        // div
        className="px-6 w-full flex items-center justify-between"
      >
        <div className="flex items-center ">
          <NavLink exact to='/'>
            <div className="text-xs lg:text-xl font-bold p-1 border rounded-lg text-center bg-custom-green text-white">TEAM FORWARD</div>

          </NavLink>
        </div>
        {loggedin ? (
          <div className=" lg:ml-auto lg:w-auto flex items-center justify-evenly">

            <div className="flex items-center text-sm font-semibold">

            <NavLink className='mr-2 lg:mr-4' to="/messages">Messages </NavLink>
            {displayNotifications(unreadCount)}

            <NavLink className='mr-2 lg:mr-4'  to="/feed">Dashboard</NavLink>
            <div className='mr-2 lg:mr-4'>Maps</div>
          </div>
          <div  className="flex items-center justify-between">
            <h1 className=" sm:hidden md:hidden hidden lg:inline   mr-1 text-xl font-bold">{user ? `${user.firstName} ${user.lastName}` : ""}</h1>
            <NavMenu />
            </div>
          </div>
        ) : (
          <div className="flex items-center lg:ml-auto">
            <Link to="/Signin">
              <Button
                text="Login"
                className="inline-block px-6 py-2.5 mr-2 bg-transparent text-green-900 font-bold text-xs leading-tight uppercase rounded hover:text-green-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
              />
            </Link>
            <Link to="/SignUp">
              <Button
                text="Sign Up"
                // className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                className="inline-block px-6 py-2.5 text-white bg-green-900 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-800 hover:shadow-lg focus:bg-green-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-950 active:shadow-lg transition duration-150 ease-in-out"
              />
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
};


export default NavBar;

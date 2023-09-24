import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useReactiveVar } from "@apollo/client";
import { userState } from "./GlobalState";
import log from "./helpers/logging";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import UpdateProfile from "./pages/UpdateProfile";
import MyProfile from "./pages/MyProfile";
import UserProfile from "./pages/UserProfile";
import Inbox from "./pages/Inbox";
import Chat from "./components/Messages/Chat";
import MapboxTemp from "./pages/MapboxTemp";


import { io } from 'socket.io-client'
import NavBar from "./components/NavBar/NavBar";


const socket = io(process.env.REACT_APP_BE_URL);

axios.defaults.withCredentials = true;

const ProtectedRoute = ({ children }) => {
  const user = useReactiveVar(userState);

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
};

function App() {
  const user = useReactiveVar(userState);
  const [apiComplete, setApiComplete] = useState(user ? true : false);
  useEffect(() => {
    if (!user) {
      axios
        // .get(`${process.env.REACT_APP_BE_URL}/signin/success`)
        .get(`${process.env.REACT_APP_BE_URL}/teamForward/loggedInUser`)
        .then((res) => {
          userState(res.data);
          setApiComplete(true);
        })
        .catch((err) => {
          log(err);
          setApiComplete(true);
        });
    }
  }, [user]);

  // Socket.on("message",()=>{
  //   axios.get(`${REACT_APP_BE_URL}/messaging/user/message/unreadCount`)
  // //   .then((res)=>{

  // //   }).catch((err)=>{
  // //     console.log(err)
  // //   })
  // })

  if (!apiComplete) {
    return null;
  }

  return (
    <BrowserRouter>
    <NavBar user={user} />
      <Routes>
        <Route
          path="/signin"
          element={user ? <Navigate to="/feed" /> : <SignIn />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={user ? <Navigate to="/feed" /> : <Home />} />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />

        <Route
          path="/updateProfile"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myProfile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/userProfile/:id"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Inbox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:chatId"
          element={
            <ProtectedRoute>
              <Chat socket={socket} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maps"
          element={
            <ProtectedRoute>
              <MapboxTemp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

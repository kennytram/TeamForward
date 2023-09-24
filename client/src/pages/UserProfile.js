
import React from 'react'
import Profile from '../components/ProfilePage/Profile'
import { useEffect, useState } from "react";
import axios from "axios";
import log from "../helpers/logging";
import { useReactiveVar } from "@apollo/client";
import { userState } from "../GlobalState";
import { useLocation, useParams } from 'react-router-dom';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/teamForward/${id}`)
      .then((res) => {
        setProfileData(res.data);
      })
      .catch((err) => {
        log(err);
      });
  }, [id]);

  // const { state } = useLocation();

  return (
    <div>
      <Profile
        profileData={profileData ? profileData : null} />
    </div>
  );
};

export default UserProfile;

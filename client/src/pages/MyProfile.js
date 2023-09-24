import { useState } from "react";
import Profile from "../components/ProfilePage/Profile";
import { userState } from "../GlobalState";
// import log from "../helpers/logging";
// import ConnectButton from "../components/Button/ConnectButton";
import { useReactiveVar } from "@apollo/client";

const MyProfile = ({}) => {
  const user = useReactiveVar(userState);

  const [profileData, setProfileData] = useState({
    _id: user ? user._id : "",
    firstName: user ? user.firstName : "",
    lastName: user ? user.lastName : "",
    bio: user ? user.bio : "",
    profession: user ? user.profession : "",
    country: user ? user.country : "",
    state: user ? user.state : "",
    city: user ? user.city : "",
    // zipCode: user ? user.zipCode : "",
    // radius: user ? user.radius : "",
    cloudinaryProfileImgUrl: user ? user.cloudinaryProfileImgUrl : "",
    // interests: user ? user.interests : "",
    activities: user ? user.activities : "",
    photos: user?.photos ? user.photos : []
  });

  return <Profile profileData={profileData} setProfileData={setProfileData} />;
};

export default MyProfile;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { userState } from "../GlobalState";
import log from "../helpers/logging";
import ProfileForm from "../components/UpdateProfilePage/ProfileForm";
import NavMenu from "../components/NavMenu/NavMenu";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const user = useReactiveVar(userState);

  const [formInfo, setFormInfo] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    bio: user.bio,
    profession: user.profession,
    country: user.country,
    state: user.state,
    city: user.city,
    // zipCode: user.zipCode,
    // radius: user.radius,
    // interests: {
    //   Networking: user.interests.networking,
    //   Mentorship: user.interests.mentorship,
    //   Chingu: user.interests.chingu,
    // },
    activities: {
      Networking: user.activities.networking,
      Mentorship: user.activities.mentorship,
      CoffeeMeet: user.activities.coffeeMeet,
      VirtualCoffee: user.activities.virtualCoffee,
      Chingu: user.activities.chingu,
      OnlineGames: user.activities.onlineGames,
      Nightlife: user.activities.nightlife,
      VirtualMeet: user.activities.virtualMeet,
      Cycling: user.activities.cycling,
      Hiking: user.activities.hiking,
      IceHockey: user.activities.iceHockey,
      Running: user.activities.running,
      SnowSport: user.activities.snowSport,
      Tennis: user.activities.tennis,
      Walking: user.activities.walking,
      WaterSport: user.activities.waterSport,
      Yoga: user.activities.yoga,
    },
  });

  const [profileImg, setProfileImg] = useState(
    user.cloudinaryProfileImgUrl ? user.cloudinaryProfileImgUrl : null
  );

  const currentProfileImg = user.cloudinaryProfileImgUrl ? user.cloudinaryProfileImgUrl : null;

  const handleFormInfoChange = (key, value) => {
    setFormInfo({ ...formInfo, [key]: value });
  };

  const handleInterests = (key, value) => {
    setFormInfo({
      ...formInfo,
      interests: {
        ...formInfo.interests,
        [key]: value,
      },
    });
  };

  const handleActivities = (key, value) => {
    setFormInfo({
      ...formInfo,
      activities: {
        ...formInfo.activities,
        [key]: value,
      },
    });
  };

  function updateProfile(form) {
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      bio: form.bio,
      profession: form.profession,
      zipCode: form.zipCode,
      radius: form.radius,
      // interests: {
      //   networking: form.interests.Networking,
      //   mentorship: form.interests.Mentorship,
      //   chingu: form.interests.Chingu,
      // },
      activities: {
        networking: form.activities.Networking,
        mentorship: form.activities.Mentorship,
        coffeeMeet: form.activities.CoffeeMeet,
        virtualCoffee: form.activities.VirtualCoffee,
        chingu: form.activities.Chingu,
        onlineGames: form.activities.OnlineGames,
        nightlife: form.activities.Nightlife,
        virtualMeet: form.activities.VirtualMeet,
        cycling: form.activities.Cycling,
        hiking: form.activities.Hiking,
        iceHockey: form.activities.IceHockey,
        running: form.activities.Running,
        snowSport: form.activities.SnowSport,
        tennis: form.activities.Tennis,
        walking: form.activities.Walking,
        waterSport: form.activities.WaterSport,
        yoga: form.activities.Yoga,
      },
    };

    //before submit - checks if user has reached the photos limit
    //after submit:
    //1.updates current profile Img if new one is changed
    //2. send new photo to cloudinary
    //3. if #2 successfull, send new photo to backend
    //4. if #3 successfull, set as current profile image
    if (profileImg?.includes("base64") && profileImg !== currentProfileImg) {
        payload.photo = profileImg;
    }
    axios
      .patch(`${process.env.REACT_APP_BE_URL}/teamForward/${user._id}`, payload)
      .then((res) => {
        log(res.data);
        userState(res.data);
      })
      .catch((err) => {
        log(err);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formInfo);
      navigate("/feed");
    } catch (error) {
      log(error);
    }
  };

  return (
    <div className="flex flex-col">
      {/* <div className="lg:absolute">
        <NavMenu />
        <h1 className="font-bold inline-block">
          {user ? `${user.firstName} ${user.lastName}` : ""}
        </h1>
      </div> */}
      <div className="m-0">
        <ProfileForm
          formInfo={formInfo}
          setFormInfo={setFormInfo}
          handleFormInfoChange={handleFormInfoChange}
          handleInterests={handleInterests}
          handleActivities={handleActivities}
          handleSubmit={handleSubmit}
          profileImg={profileImg}
          setProfileImg={setProfileImg}
          currentProfileImg={currentProfileImg}
        />
      </div>
    </div>
  );
};

export default UpdateProfile;

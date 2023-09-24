import { useEffect, useState } from "react";
import { userState } from "../../GlobalState";
import { useReactiveVar } from "@apollo/client";
import { Link, NavLink } from "react-router-dom";
import ConnectButton from "../Button/ConnectButton";
import ProfileImg from "./ProfileImg";
import NavMenu from "../NavMenu/NavMenu";

const Profile = ({ profileData }) => {
  const user = useReactiveVar(userState);
  // console.log("this is profileData", profileData);

  if (profileData)
    return (
      <div className="px-4 pb-4 pt-4">
        <div className="px-8 pb-8 bg-white shadow">
          <div className="flex justify-center">
            {/* <div className="grid grid-cols-3 text-center order-last md:order-first md:mt-0"></div> */}
            <div className="relative ">
              <ProfileImg profileData={profileData} />
            </div>
            {/* BUTTONS */}
          </div>
          <div className="flex justify-center mt-4">
            {user._id === profileData._id ? (
              <Link to="/updateProfile">
                <button className="text-white py-2 px-4 h-10 w-30 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg text-sm  transition transform hover:-translate-y-0.5">
                  Edit
                </button>
              </Link>
            ) : (
              <ConnectButton otherUserId={profileData._id} />
            )}
          </div>

          <div className="mt-4 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              {`${profileData.firstName} ${profileData.lastName}`}
            </h1>
            <p className="mt-5 text-gray-500 font-bold text-xl ">
              {profileData.profession}
            </p>
            <p className="text-gray-600 mt-6 font-semibold">
              {profileData.zipCode ? `Location: ${profileData.zipCode}` : null}
            </p>
          </div>

          <div className="mt-12 flex flex-col justify-center ">
            <p className="text-gray-800 text-center text-xl font-medium ">
              {profileData.bio}
            </p>
          </div>

          {/* <div className="mt-12 flex flex-col justify-center  text-gray-500">
            <h3 className="font-bold uppercase">Interests:</h3>
            <div className="p-1 flex flex-col sm:flex-row min-w-fit text-center">
              {Object.keys(profileData.interests).map((interest) =>
                profileData.interests[interest] ? (
                  <p className="p-1 my-3 mr-2 border bg-green-800 text-white rounded-md">
                    {interest.charAt(0).toUpperCase() + interest.slice(1)}
                  </p>
                ) : null
              )}
            </div>
          </div> */}
          <div className="mt-12 flex flex-col justify-center  text-gray-500">
            <h3 className="font-bold uppercase">Activities:</h3>
            <div className="p-1 flex flex-col sm:flex-row min-w-fit text-center">
              {Object.keys(profileData.activities).map((activity) =>
                profileData.activities[activity] ? (
                  <p className=" p-1 my-3 mr-2 border bg-green-800 text-white rounded-md">
                    {activity.charAt(0).toUpperCase() + activity.slice(1)}
                  </p>
                ) : null
              )}
            </div>
          </div>
        </div>
        <NavLink to="/feed" className="text-gray-800 text-sm flex justify-center underline mt-2">
          Back to Dashboard
        </NavLink>
      </div>
    );
  else return (
    <div class="flex flex-col items-center justify-center h-screen">
      <div
        class="inline-block h-12 w-12 animate-spin rounded-full border-4 text-success border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
          class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
      </div>
      <p class="mt-4 font-bold text-lg">
        &emsp; Retrieving Profile...
      </p>
    </div>
  )
};

export default Profile;

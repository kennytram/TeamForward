"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import BasicButtonStyling from "@/components/Button";
import { blankProfile } from "@public/assets";
import UserInfoNeeded from "@/components/UserInfoNeeded";
import { userState } from "@/GlobalState";
import { userProfileDataType } from "@/types";

const activities: string[] = [
  "networking",
  "mentorship",
  "coffeeMeet",
  "virtualCoffee",
  "chingu",
  "onlineGames",
  "nightlife",
  "virtualMeet",
  "cycling",
  "hiking",
  "iceHockey",
  "running",
  "snowSport",
  "tennis",
  "walking",
  "waterSport",
  "yoga",
];

const Feed = () => {
  const router = useRouter();
  const user = useReactiveVar(userState);
  const [activityArr, setActivityArr] = useState<string[]>([]);
  const [userList, setUserList] = useState([]);
  const [messageStatus, setMessageStatus] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<{
    [key: string]: string;
  }>({});

  const handleCircleClick = (userId: string, photo: string) => {
    setSelectedPhotos({ ...selectedPhotos, [userId]: photo });
  };

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_REACT_APP_BE_URL;
    let url = `${base}/teamForward?&activities=${activityArr.join(",")}`;
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        setUserList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [activityArr, user?.zipCode]);

  const checkUserInfoNeeded = () => {
    if (!messageStatus && !user?.dismissedUpdateProfileMessage) {
      return (
        <UserInfoNeeded
          messageStatus={messageStatus}
          setMessageStatus={setMessageStatus}
        />
      );
    }
    return null;
  };

  return (
    <div className="">
      <div className="flex flex-col">
        <div className="mx-auto">
          <div> {checkUserInfoNeeded()} </div>
          <div className="w-30 flex grid grid-rows-5 justify-center ">
            <h3 className=" mt-2 flex justify-center border-b-2 border-green-900 font-bold uppercase ">
              Filters
            </h3>
            <h3 className="mb-3 mt-1 mt-3 font-bold">Activities:</h3>
            <div className="flex flex-wrap justify-center gap-y-4">
              {activities.map((activity) => {
                const className = activityArr.includes(activity)
                  ? "bg-green-900 text-white inline-flex items-center capitalize border border-green-900 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center mr-3 "
                  : "text-green-900 inline-flex items-center capitalize border border-green-900 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center mr-3 ";

                return (
                  <BasicButtonStyling
                    key={activity}
                    text={activity}
                    className={className}
                    onClick={() => {
                      const newActivity = [...activityArr];

                      if (newActivity.includes(activity)) {
                        newActivity.splice(newActivity.indexOf(activity), 1);
                      } else {
                        newActivity.push(activity);
                      }
                      setActivityArr(newActivity);
                      console.log(activityArr, newActivity);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="inline-flex w-36 flex-col justify-center"></div>
        <div className="m-2 mx-auto mt-4 flex w-11/12 flex-wrap justify-center">
          {userList.map((userProfileData: userProfileDataType) => {
            return (
              <div className="m-2 flex h-72 w-60" key={userProfileData._id}>
                <div className="w-full max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
                  <Link
                    href="#"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className="relative flex items-center"
                  >
                    <div className="absolute bottom-0 flex w-full justify-center ">
                      {userProfileData.photos?.map((photo) => {
                        return (
                          <div
                            key={photo.cloudinaryId}
                            className={`mx-1 my-1 h-4 w-4 gap-2 rounded-full border-2 border-white bg-transparent
                            ${
                              selectedPhotos[userProfileData._id] ===
                                photo.cloudinaryImgUrl ||
                              (userProfileData.cloudinaryProfileImgUrl ===
                                photo.cloudinaryImgUrl &&
                                !selectedPhotos[userProfileData._id])
                                ? "bg-sky-500"
                                : ""
                            }`}
                            onClick={() =>
                              handleCircleClick(
                                userProfileData._id,
                                photo.cloudinaryImgUrl,
                              )
                            }
                          />
                        );
                      })}
                    </div>
                    <Image
                      className="h-40 w-screen rounded-t-lg object-cover"
                      src={
                        selectedPhotos[userProfileData._id] ||
                        userProfileData.cloudinaryProfileImgUrl ||
                        blankProfile
                      }
                      width={500}
                      height={500}
                      alt="profile image"
                    />
                  </Link>
                  <div className="m-3">
                    <h5 className="mb-2 text-center text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                      {`${userProfileData.firstName} ${userProfileData.lastName}`}
                    </h5>
                    <p className="mb-4 h-5 overflow-hidden text-center text-base text-neutral-600 dark:text-neutral-200">
                      {userProfileData.profession}
                    </p>
                    <div className="flex">
                      <button
                        onClick={() => {
                          //Note: state containing the user profile data was passed along before next migration. Next router doesnt have the option to pass along state
                          router.push(`/userProfile/${userProfileData._id}`);
                        }}
                        type="button"
                        className="active:bg-green-1000 mx-auto inline-block rounded bg-green-900 px-1 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-green-900 hover:shadow-[0_8px_9px_-4px_rgba(52,211,153,0.3),0_4px_18px_0_rgba(52,211,153,0.2)] focus:bg-green-900 focus:shadow-[0_8px_9px_-4px_rgba(52,211,153,0.3),0_4px_18px_0_rgba(52,211,153,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Feed;

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { userState } from "../GlobalState";
import { useReactiveVar } from "@apollo/client";
import { blankProfile } from "@public/assets";

const NavMenu = () => {
  const user = useReactiveVar(userState);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const dropDown = () => {
    setOpen(!open);
  };

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BE_URL}/messaging/user/message/unreadCount`)
  //     .then((res) => {
  //       setUnreadCount(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const logout = () => {
    axios
      .post(`${process.env.REACT_APP_BE_URL}/teamForward/logout`)
      .then((res) => {
        userState(undefined);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayNotifications = (unreadCount: number) => {
    if (unreadCount > 0) {
      return (
        <div
          style={{ marginTop: "-20px" }}
          className="container absolute z-50 mx-auto h-5 w-5 rounded-full bg-amber-300 "
        >
          <p className="text-center text-sm font-bold text-slate-950">
            {unreadCount}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="inline-block h-10">
      <button onClick={dropDown}>
        <Image
          src={blankProfile}
          alt="coverImage"
          className="h-10 w-10 rounded-full object-cover"
        />
      </button>
      {displayNotifications(unreadCount)}
      {open ? (
        <div className="w-25 inset-y-15 absolute right-3 z-40 mt-1 block rounded-lg border bg-white p-1 shadow-lg">
          <ul className="bg-white">
            <li className="block">
              <Link
                href="/myProfile"
                className="block w-full rounded-lg border p-1 text-start text-lg font-semibold shadow-lg"
              >
                My Profile
              </Link>
            </li>
            <li className="block">
              <Link
                href="/updateProfile"
                className="block w-full rounded-lg border p-1 text-start text-lg font-semibold shadow-lg"
              >
                Edit Profile
              </Link>
            </li>
            <li className="block">
              <Link
                href="/feed"
                className="block w-full rounded-lg border p-1 text-start text-lg font-semibold shadow-lg"
              >
                Dashboard
              </Link>
            </li>
            <li className="block">
              <Link
                href="/messages"
                className="block w-full rounded-lg border p-1 text-start text-lg font-semibold shadow-lg"
              >
                Messages
              </Link>
            </li>
            <li className="block">
              <Link
                href="/"
                onClick={logout}
                className="block w-full rounded-lg border p-1 text-start text-lg font-semibold shadow-lg"
              >
                Logout
              </Link>
            </li>
            <li className="block">
              <Link
                href="/maps"
                className="block w-full rounded-lg border p-1 text-start text-lg font-semibold shadow-lg"
              >
                Maps
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default NavMenu;

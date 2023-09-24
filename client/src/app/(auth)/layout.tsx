"use client";

import axios from "axios";
import { useEffect } from "react";
import { useReactiveVar } from "@apollo/client";

import { userState } from "@/GlobalState";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useReactiveVar(userState);

  useEffect(() => {
    if (!user) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BE_URL}/teamForward/loggedInUser`,
          { withCredentials: true },
        )
        .then((res) => {
          userState(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);
  // Note: user variable has to be processed before remaining pages can render in order to prevent errors
  if (!user) return;
  return <div>{children}</div>;
};

export default AuthLayout;

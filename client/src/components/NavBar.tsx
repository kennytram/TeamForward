"use client";

import Link from "next/link";
import { useState } from "react";

import { NavMenu } from "@/components";
import { Button } from "./ui/button";
import { logo } from "@public/assets";
import Image from "next/image";

const NavBar = () => {
  const loggedin = false;

  //added
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  const dropDown = () => {
    setOpen(!open);
  };
  const displayNotifications = (unreadCount: number) => {
    if (unreadCount > 0) {
      return (
        <div className="container absolute z-50 mx-auto -mt-5 h-5 w-5 rounded-full bg-amber-300">
          <p className="text-center text-sm font-bold text-slate-950">
            {unreadCount}
          </p>
        </div>
      );
    }
    return null;
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

  //end

  return (
    <header className="fixed z-10 w-full border-b bg-white/90 shadow backdrop-blur-sm">
      <section className="container relative mx-auto flex h-14 w-full items-center justify-between px-4 lg:px-8">
        <Link href="/">
          <Image src={logo} alt="logo" width={200} />
        </Link>

        {loggedin ? (
          <nav className="flex items-center justify-evenly lg:ml-auto lg:w-auto">
            <div className="flex items-center text-sm font-semibold">
              <Link className="mr-2 lg:mr-4" href="/messages">
                Messages
              </Link>
              {displayNotifications(unreadCount)}

              <Link className="mr-2 lg:mr-4" href="/feed">
                Dashboard
              </Link>
              <div className="mr-2 lg:mr-4">Maps</div>
            </div>
            <div className="flex items-center justify-between">
              <h1 className=" mr-1 hidden text-xl font-bold   sm:hidden md:hidden lg:inline">
                {/* {user ? `${user.firstName} ${user.lastName}` : ""} */}
              </h1>
              <NavMenu />
            </div>
          </nav>
        ) : (
          <nav className="space-x-4">
            <Link href="/signin">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link href="/signUp">
              <Button>Sign up</Button>
            </Link>
          </nav>
        )}
      </section>
    </header>
  );
};

export default NavBar;

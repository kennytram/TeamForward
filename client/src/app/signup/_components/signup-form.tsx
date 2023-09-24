import axios from "axios";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { userState } from "@/GlobalState";
import Input from "@/components/Input";
import BasicButtonStyling from "@/components/Button/BasicButtonStyling";
import { SignUpErrorsType, SignUpFormType } from "@/types";

const SignUpWEmail = () => {
  const [error, setError] = useState<SignUpErrorsType>({
    firstName: undefined,
    lastName: undefined,
    email: false,
    password: false,
  });
  const [form, setForm] = useState<SignUpFormType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const router = useRouter();

  const passwordMatches = (password: string, confirmedPassword: string) => {
    if (password && confirmedPassword === password) {
      return true;
    }
    return false;
  };

  const emailValid = useMemo(() => {
    const isValid = /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(form.email);
    const isEmpty = form.email.length === 0;

    return {
      isValid,
      isEmpty,
    };
  }, [form.email]);

  const newUserSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Reset Errors
    setError({
      firstName: undefined,
      lastName: undefined,
      email: false,
      password: false,
    });

    if (!form.firstName) {
      setError((prevData) => ({
        ...prevData,
        firstName: { message: "Please enter your first name." },
      }));
      return;
    }
    if (!form.lastName) {
      setError((prevData) => ({
        ...prevData,
        lastName: { message: "Please enter your last name." },
      }));
      return;
    }
    if (!emailValid.isValid || emailValid.isEmpty) {
      setError((prevData) => ({ ...prevData, email: true }));
      return;
    }
    if (!passwordMatches(form.password, form.confirmedPassword)) {
      setError((prevData) => ({ ...prevData, password: true }));
      return;
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BE_URL}/teamForward/newUsers`,
        form,
        { withCredentials: true },
      )
      .then((res) => {
        userState(res.data);
        router.push(`/feed`);
      })
      .catch((err) => {
        // Note: I dont think this error handling is being properly implemented on the backend
        setError(err.response.data.errors);
      });
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="block max-w-sm rounded-lg bg-white p-6 shadow-lg ">
      <form onSubmit={newUserSubmitHandler}>
        <div className="relative mb-6" data-te-input-wrapper-init>
          <Input
            title="First Name:"
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={onChangeHandler}
            id="InputFirstName"
            placeholder="Enter your First Name"
          />
          <div>
            {error.firstName && (
              <div className="font-bold text-red-400">
                {error.firstName.message}
              </div>
            )}
          </div>
        </div>
        <div className="relative mb-6" data-te-input-wrapper-init>
          <Input
            title="Last Name:"
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={onChangeHandler}
            id="InputLastName"
            placeholder="Enter Your Last Name"
          />
          <div>
            {error.lastName && (
              <div className="font-bold text-red-400">
                {error.lastName.message}
              </div>
            )}
          </div>
        </div>
        <div className="relative mb-6" data-te-input-wrapper-init>
          <Input
            title="Email:"
            type="text"
            name="email"
            value={form.email}
            onChange={onChangeHandler}
            id="InputEmail"
            placeholder="Enter Email"
          />
          <div>
            {error.email && (
              <div className="font-bold text-red-400">
                {"You must enter a valid and unique email."}
              </div>
            )}
          </div>
        </div>
        <div className="relative mb-6" data-te-input-wrapper-init>
          <Input
            title="Password:"
            type="password"
            name="password"
            value={form.password}
            onChange={onChangeHandler}
            id="InputPassword2"
            placeholder="Enter Your Password"
          />
        </div>
        <div className="relative mb-6" data-te-input-wrapper-init>
          <Input
            title="Confirm Password:"
            type="password"
            name="confirmedPassword"
            value={form.confirmedPassword}
            onChange={onChangeHandler}
            id="InputConfirmedPassword"
            placeholder="Confirm Your Password"
          />
        </div>
        <div>
          {error.password && (
            <div className="font-bold text-red-400">
              {"Please enter valid matching passwords."}{" "}
            </div>
          )}
        </div>
        <div className="mb-2 flex items-center justify-between" />
        <BasicButtonStyling
          className="inline-block w-full rounded bg-green-900 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-green-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
          type="submit"
          text="Sign Up"
        />
        <div className="mb-6 flex items-center justify-between" />
      </form>
    </div>
  );
};

export default SignUpWEmail;

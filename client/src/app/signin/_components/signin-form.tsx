import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Input from "../../../components/Input";
import { SignInFormType } from "@/types";
import { userState } from "../../../GlobalState";
import BasicButtonStyling from "../../../components/Button/BasicButtonStyling";

const SignInForm = () => {
  const [form, setForm] = useState<SignInFormType>({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const signInHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BE_URL}/teamForward/login`,
        {
          email: form.email,
          password: form.password,
        },
        { withCredentials: true },
      )
      .then((res) => {
        userState(res.data.user);
        router.push(`/feed`);
      })
      .catch((err) => {
        if (
          err.response &&
          (err.response.data === "Incorrect Email" ||
            err.response.data === "Incorrect Password")
        ) {
          setError("Your Email or Password is incorrect.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      });
  };

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevData: SignInFormType) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="block max-w-sm rounded-lg bg-white p-6 shadow-lg ">
      <form onSubmit={signInHandler}>
        <div className="relative mb-6" data-te-input-wrapper-init>
          <Input
            title="Email:"
            type="text"
            name="email"
            onChange={onFormChange}
            id="InputEmail"
            placeholder="Enter Your Email"
            value={form.email}
          />
        </div>
        <div className="relative mb-6" data-te-input-wrapper-init>
          <Input
            title="Password:"
            type="password"
            name="password"
            onChange={onFormChange}
            id="exampleInputPassword2"
            placeholder="Enter Your Password"
            value={form.password}
          />
        </div>
        <div className="mb-2 flex items-center justify-between" />
        <BasicButtonStyling
          className="inline-block w-full rounded bg-green-900 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-green-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
          type="submit"
          text="Log In"
        >
          Log In
        </BasicButtonStyling>
        <div className="mb-6 flex items-center justify-between" />
        <div>
          {error ? (
            <span className="font-bold text-red-400">{error}</span>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

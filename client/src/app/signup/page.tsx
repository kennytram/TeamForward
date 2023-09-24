"use client";

import Link from "next/link";

import SignUpForm from "./_components/signup-form";

const SignUp = () => {
  //TODO: Add Google Auth Option

  return (
    <div className="flex h-screen flex-col bg-white ">
      <div className="relative flex h-screen flex-col items-center justify-center space-y-4 bg-white ">
        <div className="flex w-80 flex-col items-center justify-center rounded bg-white p-6 shadow-none">
          <h1 className="mb-3 mt-2 text-3xl font-bold leading-normal">
            Sign Up
          </h1>
          <SignUpForm />
          <p className="mt-3">Already have an account?</p>
          <Link href="/signin" className="p-1 underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

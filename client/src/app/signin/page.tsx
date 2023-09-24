"use client";

import Link from "next/link";

import SignInForm from "@/app/signin/_components/signin-form";

const SignIn = () => {
  return (
    <main className="flex h-screen flex-col bg-white">
      <div className="relative flex h-screen flex-col items-center justify-center space-y-10 bg-white">
        <div className="flex w-80 flex-col items-center justify-center rounded bg-white p-6 shadow-none">
          <div className="flex w-80 flex-col items-center justify-center rounded bg-white p-6 shadow-none">
            <h1 className="mb-3 text-3xl font-bold leading-normal">LOG IN</h1>
            <SignInForm />
            <div className="mb-6 flex items-center justify-between"></div>
            <Link href="/signup" className="p-1 underline">
              Don't have an account yet?
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;

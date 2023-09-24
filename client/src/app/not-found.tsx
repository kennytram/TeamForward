import Link from "next/link";
import Image from "next/image";

import { ghost } from "@public/assets";

const NotFound = () => {
  return (
    <main className="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-4 bg-[#313942] px-6">
      <h1 className="error-heading">
        4
        <span className="spooky-animation">
          <Image src={ghost} alt="ghost" />
        </span>
        4
      </h1>
      <h2 className="text-[#e7ebf2]">Error: 404 page not found</h2>
      <p className="text-center text-[#ccc]">
        Sorry, the page you&apos;re looking for cannot be accessed
      </p>
      <Link
        href="/"
        className="rounded-full bg-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
      >
        Go to homepage
      </Link>
    </main>
  );
};

export default NotFound;

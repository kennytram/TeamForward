"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { hero } from "@public/assets";

const HeroImage = () => {
  return (
    <div className="relative w-full max-w-2xl">
      <motion.span
        initial={{ opacity: 0, x: -100, rotate: 30 }}
        animate={{ opacity: 1, x: 0, rotate: 30 }}
        transition={{ type: "spring", duration: 0.7, bounce: 0 }}
        className="absolute left-[15%] top-0 inline-block h-full w-3/12 bg-gradient-to-b from-black/0 via-green to-black/0 lg:scale-y-150"
      />
      <motion.span
        initial={{ opacity: 0, x: 100, rotate: 30 }}
        animate={{ opacity: 1, x: 0, rotate: 30 }}
        transition={{ type: "spring", duration: 0.7, delay: 0.35, bounce: 0 }}
        className="absolute right-1/4 top-0 inline-block h-full w-3/12 bg-gradient-to-b from-black/0 via-green-secondary to-black/0 lg:scale-y-150"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", duration: 0.7, delay: 0.7, bounce: 0 }}
      >
        <Image
          src={hero}
          className="relative  w-full"
          alt="Hero image"
          priority
        />
      </motion.div>
    </div>
  );
};

export default HeroImage;

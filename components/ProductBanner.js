import React from "react";
import { motion } from "framer-motion";
import {
  slideIn,
  fadeIn,
  staggerContainer,
  textVariant,
} from "../utils/motion";

const ProductBanner = () => {
  return (
    <div className="container  shadow-2xl rounded-lg mx-auto  h-50 w-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
      <motion.h1
        variants={textVariant(1.1)}
        className="font-extrabold text-gray-800 text-center text-xl "
      >
        Browse Product
      </motion.h1>
      <div className=" flex flex-col-reverse md:grid max-w-screen-xl px-8 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-3 lg:grid-cols-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="mr-auto place-self-center lg:col-span-7 justify-center items-center"
        >
          <motion.h1
            variants={textVariant(1.1)}
            className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl dark:text-[#191116]"
          >
            Shop on Rollend For Classic Arabic Carpet now!
          </motion.h1>
          <motion.p
            variants={fadeIn("up", "tween", 0.2, 1)}
            className="max-w-2xl mb-6 text-gray-900 lg:mb-8 md:text-lg lg:text-xl dark:text-[#3B185F] font-normal"
          >
            We focus on the design and manufacturing of high quality custom
            carpets which we do not compromise in the quality of our products
          </motion.p>
        </motion.div>
        <div className=" justify-center items-center lg:mt-0 lg:col-span-5 lg:flex">
          <motion.img
           variants={fadeIn('up', 'tween', 0.3, 1)}
            src="/Product.png"
            className=" h-80 w-80 md:h-full md:w-full"
            alt="mockup"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;

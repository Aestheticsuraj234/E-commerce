import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {
  slideIn,
  fadeIn,
  staggerContainer,
  textVariant,
} from "../utils/motion";
import AllProducts from "../components/AllProducts";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-full w-full">
      <Head>
        <title>CodesWear.com - Wear the Code</title>
        <meta name="description" content="CodesWear.com - wear the code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="bg-gradient-to-r from-indigo-200 to-lime-100">
      <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className=" flex flex-col-reverse md:grid max-w-screen-xl px-8 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-3 lg:grid-cols-12"
        >
          <div className="mr-auto place-self-center lg:col-span-7 justify-center items-center">
            <motion.h1
              variants={textVariant(1.1)}
              className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl dark:text-[#191116]"
            >
              Shop on Rollend For Classic Arabic Carpet , Electronic , Beauty , Products , Many More!
            </motion.h1>
            <motion.p
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="max-w-2xl mb-6 text-gray-900 lg:mb-8 md:text-lg lg:text-xl dark:text-[#3B185F] font-normal"
            >
              We focus on the design and manufacturing of high quality Product do not compromise in the quality of our products
            </motion.p>

            <motion.a
              variants={fadeIn("up", "tween", 0.3, 1)}
              onClick={() => router.push("/carpets")}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 rounded-lg hover:bg-gray-100 shadow-xl focus:ring-4 focus:ring-gray-100 dark:text-[#3B185F] dark:border-gray-700 dark:bg-gray-100 cursor-pointer "
            >
              Browse Product
            </motion.a>
          </div>
          
          <div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className=" justify-center items-center lg:mt-0 lg:col-span-5 lg:flex"
          >
            <motion.img
              variants={fadeIn("up", "tween", 0.3, 1)}
              src="/hero.png"
              className=" h-80 w-80 md:h-full md:w-full"
              alt="mockup"
            />
          </div>
        </motion.div>
        <AllProducts/>
       
      </section>

      <section className="bg-gradient-to-r from-indigo-200  to-lime-100">
        <div className="container px-5 py-5 mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className="flex flex-wrap w-full mb-20 flex-col items-center text-center"
          >
            <motion.h1
              variants={textVariant(1.1)}
              className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-800"
            >
              Features
            </motion.h1>
            <motion.p
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="lg:w-1/2 w-full leading-relaxed text-opacity-80"
            >
              Rollend Classic Arabic Carpet is an exclusive and unique
              collection of carpets. Rolland Collection features 30 years
              experience in manufacturing high quality, affordable and
              affordable premium quality textiles.
            </motion.p>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              className="lg:mt-0 lg:col-span-5 lg:flex"
            >
              <motion.img
                variants={fadeIn("up", "tween", 0.3, 1)}
                src="/feature.png"
                className="object-cover self-center "
                alt="mckup"
              />
            </motion.div>
          </motion.div>
          <div className="flex flex-wrap -m-4">
            <motion.div
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="xl:w-1/3 md:w-1/2 p-4"
            >
              <div className="border border-white-700 border-opacity-75 p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-100 text-pink-400 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-700 font-medium title-font mb-2">
                  Fantastic
                </h2>
                <p className="leading-relaxed text-base">
                  Welcome to Carpet online shop and I am so glad to see you on
                  our website. This is a fantastic site for buying new or used
                  carpets. The best material is used for this type of carpet. It
                  is 10 years old and it has been washed in order to maintain
                  its color.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="xl:w-1/3 md:w-1/2 p-4"
            >
              <div className="border border-white-700 border-opacity-75 p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-100 text-pink-400 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-700 font-medium title-font mb-2">
                  High quality, 100%
                </h2>
                <p className="leading-relaxed text-base">
                  Rolland Classic Arabic Carpet: high quality, 100%
                  polypropylene with the perfect combination of durability and
                  style. With the beauty of a natural appearance, Rolland
                  Classic Carpet creates a harmonious and timeless ambience you
                  will be proud to see in your homes and offices
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="xl:w-1/3 md:w-1/2 p-4"
            >
              <div className="border border-white-700 border-opacity-75 p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-100 text-pink-400 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-700 font-medium title-font mb-2">
                  single-ply and printed
                </h2>
                <p className="leading-relaxed text-base">
                  Our online shop offers over 100 single-ply and printed designs
                  in a vast range of colours and styles. Feel confident in your
                  purchase with our 60 day money back guarantee
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <hr />
    </div>
  );
}
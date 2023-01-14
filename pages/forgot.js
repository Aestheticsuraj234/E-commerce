import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useRouter } from "next/router";

const forgot = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("myuser")) {
      router.push("/");
    }
  }, []);
  // Reset Password
  const resetPassword = async () => {
    if (password == cpassword) {
      let data = {
        password,
        sendMail: false,
      };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res = await a.json();
      if (res.success) {
        console.log("Password has been changed");
      } else {
        console.log("Something went wrong");
      }
    }
  };
  // Send email using nodeMailer
  const sendResetEmail = async () => {
    let data = {
      email,
      sendMail: true,
    };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    if (res.success) {
      console.log("Password reset instruction have been sent to your email");
    } else {
      console.log("Something went wrong");
    }
  };

  const handleChange = async (e) => {
    if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    }
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {router.query.token}
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-40 h-13 mr-2"
              src="	https://www.codeswear.com/_next/image?url=%2Flogo.png&w=256&q=75"
              alt="logo"
            />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl mb-3 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Forgot Password
              </h1>
              {router.query.token && (
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      New Password
                    </label>
                    <input
                      value={password}
                      onChange={handleChange}
                      type="password"
                      name="password"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="New Password"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm New Password
                    </label>
                    <input
                      value={cpassword}
                      onChange={handleChange}
                      type="password"
                      name="cpassword"
                      id="cpassword"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Confirm Password"
                      required=""
                    />
                  </div>

                  <button
                    disabled={password !== cpassword}
                    onClick={resetPassword}
                    type="submit"
                    className="w-full disabled:bg-indigo-400 text-white bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600  dark:focus:ring-primary-800"
                  >
                    Continue
                  </button>
                  {password != cpassword && (
                    <span className="text-red-600">Password don't match</span>
                  )}
                  { password && password === cpassword && (
                    <span className="text-green-600">Password match</span>
                  )}
                  <Link href={"/login"}>
                    <p className="text-sm font-light text-white\pass dark:text-gray-400">
                      Or{" "}
                      <a
                        href="#"
                        className="font-medium text-primary-600  dark:text-primary-500"
                      >
                        Login
                      </a>
                    </p>
                  </Link>
                </form>
              )}
              {!router.query.token && (
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      value={email}
                      onChange={handleChange}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>

                  <button
                    onClick={sendResetEmail}
                    type="submit"
                    className="w-full text-white bg-indigo-600  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600  dark:focus:ring-primary-800"
                  >
                    Continue
                  </button>
                  <Link href={"/login"}>
                    <p className="text-sm font-light text-white\pass dark:text-gray-400">
                      Or{" "}
                      <a
                        href="#"
                        className="font-medium text-primary-600  dark:text-primary-500"
                      >
                        Login
                      </a>
                    </p>
                  </Link>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default forgot;

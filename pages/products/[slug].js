import React, { useState } from "react";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Product from "../../models/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = ({ buyNow, addToCart, product, variants }) => {
  console.log(product, variants);

  const router = useRouter();
  const { slug } = router.query;
  const [pin, setpin] = useState();
  const [service, setservice] = useState();

  const checkServiceability = async () => {
   
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();

    if (pinJson.includes(parseInt(pin))) {
      setservice(true);
      toast.success('🦄 Your PINCODE is serviceable!')
    } else {
      setservice(false);
      toast.error('🤔 sorry! Your PinCode is Not Servicable yet!')
    }
  };
  const onChangePin = (e) => {
    setpin(e.target.value);
  };

  const [reeds, setReeds] = useState(product.reeds);
  const [color, setcolor] = useState(product.color);

  const refreshVariant = (newreeds, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/products/${variants[newcolor][newreeds]["slug"]}`;
    window.location = url;
  };

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer
          position="top-left"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.category}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title} ({product.reeds}/{product.color})
              </h1>

              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex space-x-1">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).includes("red") &&
                    Object.keys(variants["red"]).includes(reeds) && (
                      <button
                        onClick={() => refreshVariant(reeds, "red")}
                        className={`border-2 bg-red-600 ${
                          "color" === "red"
                            ? "border-black"
                            : "border-gray-300 "
                        } rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("blue") &&
                    Object.keys(variants["blue"]).includes(reeds) && (
                      <button
                        onClick={() => refreshVariant(reeds, "blue")}
                        className={`border-2 ${
                          "color" === "blue"
                            ? "border-black"
                            : "border-gray-300 "
                        }   ml-1 bg-blue-700  rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("green") &&
                    Object.keys(variants["green"]).includes(reeds) && (
                      <button
                        onClick={() => refreshVariant(reeds, "green")}
                        className={`border-2 ${
                          "color" === "green"
                            ? "border-black"
                            : "border-gray-300 "
                        }   ml-1 bg-green-700  rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">reeds</span>
                  <div className="relative">
                    <select
                      value={reeds}
                      onChange={(e) => refreshVariant(e.target.value, color)}
                      className="rounded border appearance-none  py-2  ${color === 'blue'?'border-black':'border-gray-300'} focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                    >
                      {Object.keys(variants[color]).includes("700") && (
                        <option value={"700"}>700</option>
                      )}
                      {Object.keys(variants[color]).includes("1200") && (
                        <option value={"1200"}>1200</option>
                      )}
                      {Object.keys(variants[color]).includes("1500") && (
                        <option value={"1500"}>1500</option>
                      )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${product.price}
                </span>
                <button
                  onClick={() => {
                    buyNow(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.reeds,
                      product.color
                    );
                  }}
                  className="flex mx-1 md:ml-8 text-gray-100 bg-pink-500 disabled: border-0 py-2 px-1 md:px-6 hover:bg-pink-600 rounded "
                >
                  Buy
                </button>
                <button
                  onClick={() => {
                    toast.success(`${product.title} Added to the cart`)
                    addToCart(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.reeds,
                      product.color
                    );
                  }}
                  className="flex mx-1 md:ml-4 text-gray-100 bg-pink-500 disabled: border-0 py-2 px-2 md:px-6 hover:bg-pink-600 rounded "
                >
                  Add
                </button>
                {/* Wish list */}
                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button> */}
              </div>
              <div className="pin mt-6 flex space-x-2 text-sm   ">
                <input
                  onChange={onChangePin}
                  placeholder="Enter your PinCode"
                  type="text"
                  className="px-2 border-2 border-gray-400 rounded-md "
                />
                <button
                  onClick={checkServiceability}
                  className="flex ml-auto text-blue bg-indigo-500 border-0 py-2 px-6   hover:bg-indigo-600 rounded"
                >
                  Check
                </button>
              </div>

              {!service && service != null && (
                <div className="text-red-700 mt-3 text-sm">
                  Sorry! We do-not deliver to this pincode yet💳
                </div>
              )}
              {service && service != null && (
                <div className="text-green-700 mt-3 text-sm">
                  Yay! this pincode is now available🤟
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({ title: product.title });
  let colorReedSlug = {};

  for (let item of variants) {
    if (Object.keys(colorReedSlug).includes(item.color)) {
      colorReedSlug[item.color][item.reeds] = { slug: item.slug };
    } else {
      colorReedSlug[item.color] = {};
      colorReedSlug[item.color][item.reeds] = { slug: item.slug };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorReedSlug)),
    },
  };
}
export default Post;

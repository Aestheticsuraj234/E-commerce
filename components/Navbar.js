import React from "react";
import Link from "next/Link";
import { useRef, useState } from "react";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [dropDown, setDropdown] = useState(false);

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  const ref = useRef();
  return (
    <div className="flex px-5 flex-col md:flex-row md:justify-start justify-center items-center py-2 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg sticky top-0 z-10 ">
      <Link href={"/"}>
        <div className="logo  mr-auto md:mx-5 cursor-pointer">
          <img src="/logo.png" alt="" className="w-full h-12" />
        </div>
      </Link>
      <div className="nav">
        <ul className="flex items-center space-x-6 font-semibold md:text-md text-gray-800  ">
          <Link href={"/"}>
            <a>
             
              <li>Home</li>{" "}
            </a>
          </Link>
          <Link href={"/carpets"}>
            <a>
        
              <li>Product</li>{" "}
            </a>
          </Link>
          <Link href={"/blog"}>
            <a>
             
              <li>Blog</li>{" "}
            </a>
          </Link>
          <Link href={"/account"}>
            <a>
             
              <li>Account</li>{" "}
            </a>
          </Link>
        </ul>
        <div className="cart flex absolute items-center right-0 space-x-7  object-contain  top-3 mx-5 cursor-pointer">
          <span
            onMouseOver={() => {
              setDropdown(true);
            }}
            onMouseLeave={() => {
              setDropdown(false);
            }}
          >
            {dropDown && (
              <div
                onMouseOver={() => {
                  setDropdown(true);
                }}
                onMouseLeave={() => {
                  setDropdown(false);
                }}
                className=" absolute right-14 py-4 bg-indigo-200 top-5  shadow-lg
                  rounded-md px-5 w-36"
              >
                <ul>
                  <Link href={'/myaccount'}>
                   
                    <li className="py-1 hover:text-indigo-900 text-600 text-sm font-semibold ">
                      MyAccount
                    </li>
                  </Link>

                  <Link href={'/orders'}>
                    <li className="py-1 hover:text-indigo-900 text-600 text-sm font-semibold ">
                      Orders
                    </li>
                  </Link> 
        
                   <li onClick={logout} className="py-1 hover:text-indigo-900 text-600 text-sm font-semibold ">
                      Logout
                    </li> 
                
                </ul>
              </div>
            )}

            {user.value && (
              <MdAccountCircle className="text-xl md:text-2xl text-gray-900 mx-2" />
            )}
          </span>
          {!user.value && (
            <Link href={"/login"}>
              <a>
                <button className="bg-indigo-600 px-2 py-1 text-white rounded-md text-sm ">
                  Login
                </button>
              </a>
            </Link>
          )}
          <AiOutlineShoppingCart
            onClick={toggleCart}
            className="text-xl md:text-2xl text-gray-900 shadow-slate-500 "
          />
        </div>

        {/* sidebar   */}

        <div
          ref={ref}
          className={`w-72 h-[full] z-10 sideCart overflow-y-scroll absolute top-0 right-0  backdrop-blur-sm py-10 px-8 bg-white/30 transition-transform ${
            Object.keys(cart).length !== 0
              ? "translate-x-0"
              : "translate-x-full"
          }  `}
        >
          <h2 className="font-bold text-xl text-center"> Shoping-Cart</h2>
          <span
            onClick={toggleCart}
            className="absolute right-2 top-2  cursor-pointer text-2xl  text-pink-500"
          >
           
            <AiFillCloseCircle />
          </span>
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).length == 0 && (
              <div className="my-4 text-base font-semibold">
                ????Cart is empty
              </div>
            )}

            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex  my-3">
                    <div className="w-2/3 font-semibold ">
                      {cart[k].name} ({cart[k].size}/{cart[k].variant}){" "}
                    </div>
                    <div className="w-1/3 flex items-center justify-center font-semibold text-lg">
                      <AiFillMinusCircle
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].reeds,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer text-pink-300"
                      />

                      <span className="mx-2 text-sm">{cart[k].qty} </span>

                      <AiFillPlusCircle
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].reeds,
                            cart[k].variant
                          );
                        }}
                        className=" cursor-pointer  text-pink-500"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="font-bold my-2 ">SubTotal : ${subTotal}</div>

          <div className="flex">
            <Link href={"/checkout"}>
              <button className="flex mx-2 mt-6 text-pink-500 bg-gray-100 border-0 py-2 px-2 focus:outline-none font-semibold hover:bg-gray-200 rounded text-sm ">
                <BsFillBagCheckFill className="m-1" /> Checkout
              </button>
            </Link>
            <button
              onClick={clearCart}
              className="flex mx-2 mt-6 text-pink-3 bg-gray-100 border-0 py-2 px-2 focus:outline-none hover:bg-gray-200-600 rounded text-sm  font-semibold"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Order from "../models/Order";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyOrder = ({ order, clearCart }) => {
  const router = useRouter();
  const [date, setDate] = useState();
  useEffect(() => {
    const Products = order.products;
    if (router.query.clearCart == 1) {
      clearCart();
    }
    const d = new Date(order.createdAt).toLocaleDateString({
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    setDate(d);
  }, []);

  return (
    <div>
      <section className="text-gray-200 bg-gray-900 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Rollend Trade company
              </h2>
              <h1 className="text-white text-3xl title-font font-medium mb-4">
                Order Id - #{order.orderId}
              </h1>

              <p className="leading-relaxed mb-4">
                Your order Has been Successfully Placed, Your payment is{" "}
                {order.Status}{" "}
              </p>
              <p className="leading-relaxed mb-4">
                Order Placed on: {date.toLocalString("en-IN")}
              </p>

              <div className="flex mb-4">
                <a className="flex-grow text-center text-indigo-400  border-indigo-500 py-2 text-lg px-1">
                  item Description
                </a>

                <a className="flex-grow  text-center border-gray-800 py-2 text-lg px-1">
                  Quantity
                </a>
                <a className="flex-grow  text-center border-gray-800 py-2 text-lg px-1">
                  Item Total
                </a>
              </div>

              {Object.keys(Products).map((key) => {
                return (
                  <div key={key} className="flex border-t border-gray-800 py-2">
                    <span className="text-gray-500">
                      {Products[key].name}/{Products[key].size}/
                      {Products[key].variant}
                    </span>
                    <span className="mx-auto text-white">
                      {Products[key].qty}
                    </span>
                    <span className="mx-auto text-white">
                      ${Products[key].price} X {Products[key].qty} ={" "}
                      {Products[key].price * Products[key].qty}
                    </span>
                  </div>
                );
              })}

              <div className="flex flex-col">
                <span className="title-font font-medium text-2xl text-white">
                  SubTotal ${order.amount}
                </span>
                <div className="my-2">
                  <button className="flex mx-0 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="/delivery.svg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}
export default MyOrder;

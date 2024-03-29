import React, { useEffect,useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Link from "next/link";

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorder`, {
        method: "POST",
        body: JSON.stringify({ token: localStorage.getItem("myuser") }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let res = a.json();
      setOrders(res.orders);
    };
    if (!localStorage.getItem("myuser")) {
      router.push("/");
    } else {
      fetchOrders();
    }
  }, []);

  return (
    <div className="container text-center uppercase mx-auto min-h-screen">
      <h1 className="font-bold text-xl p-8">My Orders</h1>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg m-3 rounded-md">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-900 uppercase bg-indigo-200">
            <tr>
              <th scope="col" className="py-3 px-6">
                #Order Id
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Amount
              </th>
              <th scope="col" className="py-3 px-6">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => {
              return (
                <tr
                  key={item._id}
                  className="bg-indigo-300 border-b"
                >
                  <td className="py-4 px-6 font-semibold text-gray-900 ">
                    {item.orderId}
                  </td>

                  <td className="py-4 px-6 font-semibold text-gray-900 ">
                    {item.email}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900 ">
                    {item.amount}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900 ">
                    <Link href={"/order/?id=" + item._id}>
                      <a>Details</a>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

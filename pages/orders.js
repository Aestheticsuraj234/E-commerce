import React, { useEffect,useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Link from "next/Link";

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
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                    {item.orderId}
                  </td>

                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                    {item.email}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                    {item.amount}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
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

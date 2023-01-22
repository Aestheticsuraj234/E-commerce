import React, { useState, useEffect } from "react";
import Link from "next/link";

const Suggestions = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/getAllOneProducts`
        );
        const data = await res.json();
        setProducts(data.products);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="text-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <span className="font-bold text-start text-3xl py-3  border-collapse block ">
          {" "}
          Suggested Products
        </span>
        <div className="h-1 w-20 bg-indigo-500 rounded m-3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((items) => (
            <Link
              key={items._id}
              passHref={true}
              href={`/products/${items.product.slug}`}
            >
              <div className="max-w-sm rounded overflow-hidden shadow-lg space-y-2">
                <img
                  src={items.product.img}
                  alt="Product Image"
                  className="h-40 rounded w-full object-contain object-center mb-6"
                />
                <div className="px-6 py-4">
                  <div className="font-medium text-xl mb-2">
                    {items.product.title}
                  </div>
                </div>
                <div className="px-6 py-4">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {items.product.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Suggestions;

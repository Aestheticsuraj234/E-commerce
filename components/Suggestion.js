import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Suggestions = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const productRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/suggestion");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  // const handlePrevious = () => {
  //   if (isTransitioning) return;
  //   setIsTransitioning(true);
  //   let newIndex = currentIndex - 1;
  //   if (newIndex < 0) {
  //     newIndex = products.length - 1;
  //   }
  //   setCurrentIndex(newIndex);
  // };

  // const handleNext = () => {
  //   if (isTransitioning) return;
  //   setIsTransitioning(true);
  //   let newIndex = currentIndex + 1;
  //   if (newIndex >= products.length) {
  //     newIndex = 0;
  //   }
  //   setCurrentIndex(newIndex);
  // }
  
  return (
    <section className="text-gray-900 body-font">
    <div className="container px-5 py-24 mx-auto">
    <span className="font-bold text-start text-3xl  border-collapse block "> Suggestions</span>
    <div className="h-1 w-20 bg-indigo-500 rounded m-3"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((items) => (
          <Link
            key={items._id}
            passHref={true}
            href={`/products/${items.slug}`}
          >
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img
                src={items.img}
                alt="Product Image"
                className="h-40 rounded w-full object-contain object-center mb-6"
              />
              <div className="px-6 py-4">
                <div className="font-medium text-xl mb-2">
                  {items.title}
                </div>
                <p className="text-gray-700 text-base">
                  {items.description.substring(0, 20)}...
                </p>
              </div>
              <div className="px-6 py-4">
                <span className="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {items.category}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {items.madeIn}
                </span>
              </div>
              <div className="px-6 py-4">
                <span
                  className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm
    font-semibold text-gray-700 mr-2"
                >
                  ${items.price}
                </span>
                <span className="inline-block bg-indigo-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {items.availableQty} Available
                </span>
              </div>
              <div className="px-6 py-4">
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-full">
                  Add to Cart
                </button>
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

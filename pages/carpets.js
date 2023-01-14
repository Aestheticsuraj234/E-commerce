import Link from "next/link";
import Product from "../models/Product";
import mongoose from "mongoose";
import ProductBanner from "../components/ProductBanner";
import Image from "next/image";

const carpets = ({ products }) => {
  return (
    <div>
      <section className="bg-gradient-to-r from-indigo-200 via-red-200 to-lime-100">
        <div className="container px-5 py-12 mx-auto">
          <ProductBanner />
          <h1 className="font-extrabold py-12 text-gray-800 text-center text-xl">
            Top Product
          </h1>

          <div className=" flex flex-wrap  mx-2 my-2 p-2 space-y-4 h-full w-full space-x-4 ">
            {Object.keys(products).map((items) => {
              return (
                <Link
                  key={products[items]._id}
                  passHref={true}
                  href={`/products/${products[items].slug}`}
                >
                  <div className="w-full max-w-sm  rounded-lg shadow-lg  border-2 bg-pink-50 ">
                    <a href="#">
                      <img
                        className="p-3 rounded-t-lg object-contain h-48 mx-auto shadow-md m-1"
                        src={products[items].img}
                        alt="product image"
                      />
                    </a>
                    <div className="px-5 pb-5">
                      <a href="#">
                        <h5 className="text-md font-semibold tracking-tight  dark:text-gray-900">
                          {products[items].title}
                        </h5>
                      </a>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold  dark:text-gray-900">
                          ${products[items].price}
                        </span>

                        <a
                          href="#"
                          className="text-black bg-pink-500 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                        >
                          Add to cart
                        </a>
                      </div>
                      <div className="mt-1">
                        <p className="inline-flex">Reeds:</p>
                        {products[items].reeds.map((reed) => (
                          <span className="border border-gray-300 px-1 mx-1">
                            {reed}
                          </span>
                        ))}
                      </div>
                      <div className="mt-1">
                        {products[items].color.map((color) => (
                          <button
                            className={`border-2 bg-${color}-600 rounded-full w-6 h-6`}
                          ></button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
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
  let products = await Product.find();
  let carpets = {};

  for (let item of products) {
    if (item.title in carpets) {
      if (
        !carpets[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        carpets[item.title].color.push(item.color);
      }
      if (
        !carpets[item.title].reeds.includes(item.reeds) &&
        item.availableQty > 0
      ) {
        carpets[item.title].reeds.push(item.reeds);
      }
      if (
        !carpets[item.title].threads.includes(item.threads) &&
        item.availableQty > 0
      ) {
        carpets[item.title].threads.push(item.threads);
      }
    } else {
      carpets[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        carpets[item.title].color = [item.color];
        carpets[item.title].reeds = [item.reeds];
        carpets[item.title].threads = [item.threads];
      } else {
        carpets[item.title].color = [];
        carpets[item.title].reeds = [];
        carpets[item.title].threads = [];
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(carpets)) }, // will be passed to the page component as props
  };
}

export default carpets;

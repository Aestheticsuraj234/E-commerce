import Link from "next/link";
import Product from "../models/Product";
import mongoose from "mongoose";
import ProductBanner from "../components/ProductBanner";
import { motion } from "framer-motion";
import {
  slideIn,
  fadeIn,
  staggerContainer,
  textVariant,
} from "../utils/motion";

const Electronicm = ({ products }) => {
  return (
    <div>
       <section className="bg-gradient-to-r min-h-screen from-indigo-200 via-red-200 to-lime-100">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="container px-5 py-12 mx-auto"
        >
          {/* <ProductBanner /> */}
          <h1 className="font-extrabold py-12 text-gray-800 text-center text-xl">
            Top Product
          </h1>

          {Object.keys(products).length === 0 && (
            <h1 className="font-bold text-center text-4xl ">
              Sorry All the Electronic Products are Out of Stock
            </h1>
          )}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 m-auto h-full w-full ">
            {Object.keys(products).map((items) => {
              let description = products[items].description.slice(0, 50);
              description =
                description.length < products[items].description.length
                  ? description + "..."
                  : description;
              return (
                <Link
                  key={products[items]._id}
                  passHref={true}
                  href={`/products/${products[items].slug}`}
                >
                  <div className="w-60 h-full  rounded-lg shadow-lg  border-2 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 ">
                    <a href="#">
                      <img
                        className="p-3 rounded-t-lg object-contain h-48 mx-auto shadow-md m-1 hover:scale-x-100 hover:transition-all hover:translate-y-2"
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
                          className="text-white hover:transition-transform hover:translate-y-1 bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:focus:ring-blue-800"
                        >
                          Add to cart
                        </a>
                      </div>

                      <a href="#">
                        <h5 className="text-md font-semibold tracking-tight  dark:text-gray-900">
                          <h5 className="text-md font-semibold tracking-tight  dark:text-gray-900">
                            {description}
                          </h5>
                        </h5>
                      </a>
                      <div className="mt-1">
                        {products[items].color.map((color) => (
                          <button
                            key={color}
                            className={`border-2 ${`bg-${color}`} hover:bg-${color}-500 rounded-full w-4 h-4`}
                          ></button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </section>
    </div>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "electronics" });
  let Electronicm = {};

  for (let item of products) {
    if (item.title in Electronicm) {
      if (
        !Electronicm[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        Electronicm[item.title].color.push(item.color);
      }
      if (
        !Electronicm[item.title].reeds.includes(item.reeds) &&
        item.availableQty > 0
      ) {
        Electronicm[item.title].reeds.push(item.reeds);
      }
      if (
        !Electronicm[item.title].threads.includes(item.threads) &&
        item.availableQty > 0
      ) {
        Electronicm[item.title].threads.push(item.threads);
      }
    } else {
      Electronicm[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        Electronicm[item.title].color = [item.color];
        Electronicm[item.title].reeds = [item.reeds];
        Electronicm[item.title].threads = [item.threads];
      } else {
        Electronicm[item.title].color = [];
        Electronicm[item.title].reeds = [];
        Electronicm[item.title].threads = [];
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(Electronicm)) }, // will be passed to the page component as props
  };
}

export default Electronicm;

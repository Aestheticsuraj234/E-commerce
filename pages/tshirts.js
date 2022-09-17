import React from "react";
import Link from "next/link";
import Product from "../models/Product";
import mongoose from "mongoose";

const Tshirts = ({ products }) => {
  console.log(products);
  return (
    <div>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Object.keys(products).map((item) => {
              return (
                <Link
                  passHref={true}
                  key={products[item]._id}
                  href={`/products/${products[item].slug}`}
                >
                  <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer">
                    <a className="block relative  rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="  md:h-[36vh] h-[30vh] block m-auto md:mx-0"
                        src={products[item].img}
                      />
                    </a>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        T-shirts
                      </h3>
                      <h2 className="text-white title-font text-lg font-medium">
                        {item.title}
                      </h2>
                      <p className="mt-1"> ₹{products[item].price}</p>
                      <div className="mt-1">
                        {products[item].size.includes('S') && <span className='border border-gray-300 px-1 mx-1'> S,</span>}
                        {products[item].size.includes('M') && <span className='border border-gray-300 px-1 mx-1'> M</span>}
                        {products[item].size.includes('L') && <span className='border border-gray-300 px-1 mx-1'> L</span>}
                        {products[item].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1'> XL</span>}
                        {products[item].size.includes('XXl') && <span className='border border-gray-300 px-1 mx-1'> XXl</span>}
                      </div>

                      <div className="mt-1"> 
                       {
                              products[item].color.includes('red') && <button className="border-2 border-gray-300 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                              products[item].color.includes('red') && <button className="border-2 border-gray-300 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                              products[item].color.includes('red') && <button className="border-2 border-gray-300 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                              products[item].color.includes('red') && <button className="border-2 border-gray-300 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                              products[item].color.includes('red') && <button className="border-2 border-gray-300 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      }
                      
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
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({category:'T-shirt'});
  let tshirts = {}
  for(let item of products){

    if(item.title in tshirts){
    if(!tshirts[item.title].color.includes(item.color) && item.availableQty>0){
                tshirts[item.title].color.push(item.color)
                tshirts[item.title].size.push(item.size)
    }

    }
    else{
          tshirts[item.title] = JSON.parse(JSON.stringify(item))
          if(item.availableQty > 0){
            tshirts[item.title].color = [item.color]
            tshirts[item.title].size = [item.size]
          }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
  };
}

export default Tshirts;

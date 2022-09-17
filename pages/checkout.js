import React from 'react'
import Link from 'next/Link'

import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import {FaGratipay} from 'react-icons/fa'


const checkout = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  return (
    <div className=' px-2 container sm:m-auto '>
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout👋</h1>
      <h2 className='font-semibold text-xl ' >1. Delivery Details</h2>
      <div className='mx-auto flex my-2'>

        <div className='px-2 w-1/2'>
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

        <div className='px-2 w-1/2'>
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

      </div>

      <div className='px-2 w-full'>
        <div className=" mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>


          <textarea name='address' id='address' cols='30' rows='2' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          phone
          city
          state
          pincode


        </div>
      </div>

      <div className='mx-auto flex my-2'>

        <div className='px-2 w-1/2'>
          <div className=" mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

        <div className='px-2 w-1/2'>
          <div className=" mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

      </div>


      <div className='mx-auto flex my-2'>

        <div className='px-2 w-1/2'>
          <div className=" mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="state" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

        <div className='px-2 w-1/2'>
          <div className=" mb-4">
            <label htmlFor="PinCode" className="leading-7 text-sm text-gray-600">PinCode</label>
            <input type="pincode" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>

      <h2 className='font-semibold text-xl'>
        2. Review Cart Items & Pay
      </h2>

      <div className=' h-[full] z-10 sideCart my-2 p-6   bg-pink-300'>


        <ol className='list-decimal font-semibold'>

          {Object.keys(cart).length == 0 && <div className='my-4 text-base font-semibold'>
            🛒Cart is empty
          </div>}

          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className='item flex  my-3'>
                <div className=' font-semibold '>
                  {cart[k].name}

                </div>
                <div className='w-1/3 flex items-center justify-center font-semibold text-lg'>

                  <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-indigo-800' />


                  <span className='mx-2 text-sm'>{cart[k].qty} </span>

                  <AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className=' cursor-pointer text-indigo-800' />

                </div>
              </div>
            </li>
          })

          }
          <span className='font-bold '>
            SubTotal : ₹{subTotal}
          </span>

        



        </ol>
    
      </div>

      <div className='mx-[2.8] my-2'>
            <Link href={'/checkout'}>
              <button class="flex mx-2 mt-6 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none font-semibold hover:bg-indigo-600 rounded text-sm "><FaGratipay className='m-1' /> Pay ₹{subTotal} </button>
            </Link>

      </div>



    </div>
  )
}

export default checkout
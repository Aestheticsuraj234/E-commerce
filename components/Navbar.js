import React from 'react'
import Link from 'next/Link'
import { useRef } from 'react'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'


const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {

const toggleCart = () => {

if (ref.current.classList.contains('translate-x-full')) {

  ref.current.classList.remove('translate-x-full');
  ref.current.classList.add('translate-x-0');
}

else if (!ref.current.classList.contains('translate-x-full')) {
  ref.current.classList.remove('translate-x-0');
  ref.current.classList.add('translate-x-full');
}
}

const ref = useRef()
return (
<div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-2 mb-1 shadow-md bg-gray-800'>
  <Link href={'/'}>
    <div className='logo mx-5 cursor-pointer' >
      <img src='https://www.codeswear.com/_next/image?url=%2Flogo.png&w=256&q=75' alt='' />
    </div>
  </Link>
  <div className='nav'>
    <ul className='flex items-center space-x-6 font-bold md:text-md text-indigo-400  '>
      {['Tshirts', 'Hoodies', 'Stickers', 'Mugs'].map((items) => (
        <Link href={items.toLowerCase()}>
          <a> <li>{items}</li></a>
        </Link>
      ))}
    </ul>
    <div onClick={toggleCart} className='cart absolute right-0 top-3 mx-5 cursor-pointer'>

      <AiOutlineShoppingCart className='text-xl md:text-2xl text-indigo-400 ' />

    </div>
    {/* sidebar   */}

    <div ref={ref} className='w-72 h-full z-10 sideCart absolute top-0 right-0  backdrop-blur-sm py-10 px-8 bg-white/30 transition-transform translate-x-full '>
      <h2 className='font-bold text-xl text-center'> Shoping-Cart</h2>
      <span onClick={toggleCart} className='absolute right-2 top-2  cursor-pointer text-2xl text-indigo-600'> <AiFillCloseCircle /></span>
      <ol className='list-decimal font-semibold'>
        {Object.keys(cart).length == 0 && <div className='my-4 text-base font-semibold'>Your Cart is Empty</div>}

        {Object.keys(cart).map((K) => {
          return (<li key={K}>
            <div className='item flex  my-3'>
              <div className='w-2/3 font-semibold '>
                {cart[K].name}
              </div>
              <div className='w-1/3 flex items-center justify-center font-semibold text-lg'>
                <AiFillMinusCircle onClick={removeFromCart(K,1,cart[K].price,cart[K].name,cart[K].size,cart[K].variant)} className='cursor-pointer text-indigo-800' />
                <span className='mx-2 text-sm'>{cart[K].qty}</span>
                <AiFillPlusCircle  onClick={addToCart(K,1,cart[K].price,cart[K].name,cart[K].size,cart[K].variant)} className=' cursor-pointer text-indigo-800' />
              </div>
            </div>
          </li>)
        })
        }

      </ol>

      <div className='flex'>

        <button class="flex mx-2 mt-6 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none font-semibold hover:bg-indigo-600 rounded text-sm "><BsFillBagCheckFill className='m-1' />  Checkout</button>
        <button onClick={clearCart} class="flex mx-2 mt-6 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm  font-semibold">Clear-Cart</button>

      </div>
    </div>
  </div>
</div>


)
}

export default Navbar
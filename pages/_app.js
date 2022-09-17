import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)


  useEffect(() => {
    console.log("hello this is useEffect running..")
    try {
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')));
        saveToCart(JSON.parse(localStorage.getItem('cart')));
      }
    }

    catch (e) {
      console.error(e, 'this is error...')
      localStorage.clear()
    }
   
   

  }, [])


  // . Save To Cart🛒
  const saveToCart = (myCart) => {

    localStorage.setItem('cart', JSON.stringify(myCart))

    let subT = 0

    let keys = Object.keys(myCart)

    for (let i = 0; i < keys.length; i++) {

      subT += myCart[keys[i]].price * myCart[keys[i]].qty

    }
    setSubTotal(subT)
  }



  // .add to cart

  const addToCart = (itemCode, qty, price, name, size, variant) => {

    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + 1;
    }

    else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };

    }
    setCart(newCart)
    saveToCart(newCart)
  }


  // clear cart🛒🔎
  const clearCart = () => {
    setCart({})
    saveToCart({})
  }

  // removeFromCart🔥
  const removeFromCart = (itemCode, qty, price, name, size, variant) => {

    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {

      newCart[itemCode].qty = cart[itemCode].qty - qty
    }

    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode]
    }
    setCart(newCart)
    saveToCart(newCart)

  }

  return (
    <>
      <Navbar key={subTotal} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />

      <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}  {...pageProps} />

      <Footer />


    </>
  )


}



export default MyApp
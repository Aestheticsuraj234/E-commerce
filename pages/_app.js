import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)

  // using useEffect 
  useEffect(()=>{
    console.log("hey I am useEffect from from _app.js")
    try{
          if(localStorage.getItem("cart")){
            setCart(JSON.parse(localStorage.getItem("cart")))
          }
    }
    catch(e){
      console.log("Something went wron ",e)
    }
  })
  
  



  // 1. create a SaveCart function
  const saveCart =(myCart)=>{
    localStorage.setItem('cart', JSON.stringify(myCart));
    let subt = 0;
    for(let i=0; i < Object.keys(myCart).length; i++ ){
          subt += myCart[Object.keys(myCart)[i]].price * myCart[Object.keys(myCart)[i]].qty;
      }
      setSubTotal(subt)
  }

  // 2. create a AddtoCart function🤑
  const addToCart = (itemCode,qty,price,name,size,variant) => {

        let newCart = cart;

        if(itemCode in cart) {
              newCart[itemCode].qty = cart[itemCode].qty + qty
        }

        else{
          // if item is not in a cart then qty is one
          newCart[itemCode] = {qty:1 , price,name,size,variant}
        }
        setCart(newCart)
        saveCart(newCart)
  }

  // 3. create a ClearCart function

  const clearCart = () =>{

    setCart({})
    saveCart({})
  }
 

  // 4. create a RemoveFromCart function💳
  const removeFromCart = (itemCode,qty,price,name,size,variant) => {

    let newCart = JSON.parse(JSON.stringify(cart));

    if(itemCode in cart) {
          newCart[itemCode].qty = cart[itemCode].qty - qty
    }

    if(newCart[itemCode]["qty"]<=0 )
    {
      delete newCart[itemCode]
    }
    setCart(newCart)
    saveCart(newCart)
}

  return (
    <>
      <Navbar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart}
        clearCart={clearCart} subTotal={subTotal} />
      <Component
        cart={cart} addToCart={addToCart} removeFromCart={removeFromCart}
        clearCart={clearCart} subTotal={subTotal} {...pageProps}
      />
      <Footer />


    </>
  )


}



export default MyApp
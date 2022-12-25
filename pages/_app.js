import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.css";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState();
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    console.log("hello this is useEffect running..");
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveToCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (e) {
      console.error(e, "this is error...");
      localStorage.clear();
    }
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token });
      setKey(Math.random());
    }
  }, [router.query]);
  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser({ value: null });
    setKey(Math.random());
    router.push("/");
  };

  // . Save To Cart🛒
  const saveToCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));

    let subT = 0;

    let keys = Object.keys(myCart);

    for (let i = 0; i < keys.length; i++) {
      subT += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subT);
  };

  // .add to cart

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + 1;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(newCart);
    saveToCart(newCart);
  };
  // buyNow
  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let newCart = { itemCode: { qty: 1, price, name, size, variant } };

    setCart(newCart);
    saveToCart(newCart);

    router.push("/checkout");
  };

  // clear cart🛒🔎
  const clearCart = () => {
    setCart({});
    saveToCart({});
  };

  // removeFromCart🔥
  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }

    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveToCart(newCart);
  };

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        waitingTime={500}
        onLoaderFinished={() => setProgress(0)}
      />

      
        <Navbar
          logout={logout}
          user={user}
          key={key}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
        />
      

      <Component
        buyNow={buyNow}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        {...pageProps}
      />

      {/* <Footer /> */}
    </>
  );
}

export default MyApp;

import React from "react";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { ProductContextProvider } from "../components/ProductsContext";

export default function App({ Component, pageProps }) {
  return (
    <ProductContextProvider>
      <Component {...pageProps} />
    </ProductContextProvider>
  );
}

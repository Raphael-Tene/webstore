import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { HiHome, HiShoppingCart } from "react-icons/hi";
import { ProductContext } from "./ProductsContext";

export default function Footer() {
  const router = useRouter();
  const path = router.pathname;

  // using context
  // @ts-ignore
  const { selectedProducts } = useContext(ProductContext);

  return (
    <footer className='sticky bottom-0 p-5 flex border-t text-gray-400 border-gray-300 text-center items-center justify-center bg-white shadow-sm shadow-gray-200'>
      <div className='flex items-center space-x-12'>
        <Link
          href='/'
          className={
            (path === "/" ? "text-emerald-500 " : "") +
            "flex flex-col justify-center items-center"
          }>
          {" "}
          <HiHome /> Home
        </Link>
        <Link
          className={
            (path === "/checkout" ? "text-emerald-500 " : "") +
            "flex flex-col justify-center items-center"
          }
          href='/checkout'>
          {" "}
          <HiShoppingCart />
          Cart {selectedProducts.length}
        </Link>
      </div>
    </footer>
  );
}

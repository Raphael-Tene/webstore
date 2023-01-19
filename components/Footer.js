import Link from "next/link";
import React from "react";
import { HiHome, HiShoppingCart } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className='sticky bottom-0 p-5 flex  justify-center bg-blue-100 shadow-2xl shadow-gray-900'>
      <div className='flex items-center space-x-4'>
        <Link href='/'>
          {" "}
          <HiHome /> Home
        </Link>
        <Link href='/' className=''>
          {" "}
          <HiShoppingCart />
          Cart 0
        </Link>
      </div>
    </footer>
  );
}

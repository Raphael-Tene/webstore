// @ts-nocheck

import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Footer from "../components/Footer";
import { ProductContext } from "../components/ProductsContext";

export default function checkout() {
  const { selectedProducts, setSelectedProducts } = useContext(ProductContext);

  const [productInfo, setProductInfo] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    fetch("/api/products?ids=" + uniqIds.join(","))
      .then((response) => response.json())
      .then((json) => setProductInfo(json));
  }, [selectedProducts]);

  function addMoreOfThisProduct(id) {
    setSelectedProducts((prev) => [...prev, id]);
  }

  function addLessOfThisProduct(id) {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts((prev) => {
        return prev.filter((value, index) => index !== pos);
      });
    }
  }
  return (
    <>
      <div className='flex mx-3 items-center justify-center mt-10'>
        <div className=''>
          {!productInfo.length && <div>No Products in your shopping cart.</div>}
          {productInfo.length &&
            productInfo.map((item) => (
              <div className='flex mb-5'>
                <div className='bg-gray-100 p-3 shrink-0 rounded-xl'>
                  <Image
                    src={item.picture}
                    width={200}
                    height={200}
                    className='object-contain w-24'
                  />
                </div>
                <div className='pl-4'>
                  <h3 className='font-bold text-lg'>{item.name}</h3>
                  <p className='text-sm leading-4'>{item.description}</p>
                  <div className='flex'>
                    <div className='grow mt-2'>${item.price}</div>
                    <div className='flex items-center justify-center mt-2'>
                      <button
                        onClick={() => addLessOfThisProduct(item._id)}
                        className='border px-2 border-emerald-300 text-emerald-500 rounded-lg'>
                        -
                      </button>
                      <p className='px-2'>
                        {
                          selectedProducts.filter((id) => id === item._id)
                            .length
                        }
                      </p>

                      <button
                        onClick={() => addMoreOfThisProduct(item._id)}
                        className='border px-2 text-white border-emerald-300 bg-emerald-500 rounded-lg'>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <div className='mb-3 rounded-lg flex flex-col space-y-4 border border-emerald-400 shadow-md shadow-gray-300 p-4'>
            <input
              onChange={(e) => setAddress(e.target.value)}
              type='text'
              className='outline-none p-2 border border-emerald-200 rounded-md'
              placeholder='Street address, number'
            />
            <input
              onChange={(e) => setCity(e.target.value)}
              type='text'
              className='outline-none p-2 border border-emerald-200 rounded-md'
              placeholder='City and postal code'
            />
            <input
              onClick={(e) => setName(e.target.value)}
              type='text'
              className='outline-none p-2 border border-emerald-200 rounded-md'
              placeholder='Your name'
            />
            <input
              onClick={(e) => setEmail(e.target.value)}
              type='email'
              className='outline-none p-2 border border-emerald-200 rounded-md'
              placeholder='Email address'
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

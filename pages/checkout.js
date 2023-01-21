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

  const deliveryPrice = 5;
  let subtotal = 0;
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const price = productInfo.find((p) => p._id === id)?.price;

      subtotal += price * selectedProducts.length;
    }
  }

  const total = deliveryPrice + subtotal;

  return (
    <>
      <div className=' mx-3 items-center flex  justify-center mt-10'>
        {/* products */}
        <div>
          {/* {!productInfo.length && <div>No Products in your shopping cart.</div>} */}
          {productInfo.length &&
            productInfo.map((item) => {
              const amount = selectedProducts.filter(
                (id) => id === item._id
              ).length;

              if (amount === 0) {
                return;
              }
              return (
                <div className='flex mb-5' key={item._id}>
                  <div className='bg-gray-100 p-3 shrink-0 rounded-xl'>
                    <Image
                      src={item.picture}
                      width={200}
                      height={200}
                      className='object-contain w-24'
                      alt={item.name}
                    />
                  </div>
                  <div className='pl-4'>
                    <h3 className='font-bold text-lg'>{item.name}</h3>
                    <p className='text-sm leading-4'>{item.description}</p>
                    <div className='flex'>
                      <div className='grow mt-2'> GH₵{item.price}</div>
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
              );
            })}
          <>
            {/* form control */}
            <div>
              <form action='/api/checkout_sessions' method='POST'>
                <div className='mb-3 rounded-lg flex flex-col space-y-4 border border-emerald-400 shadow-md shadow-gray-300 p-4'>
                  <input
                    name='address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type='text'
                    className='outline-none p-2 border border-emerald-200 rounded-md'
                    placeholder='Street address, number'
                  />
                  <input
                    name='city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type='text'
                    className='outline-none p-2 border border-emerald-200 rounded-md'
                    placeholder='City and postal code'
                  />
                  <input
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    className='outline-none p-2 border border-emerald-200 rounded-md'
                    placeholder='Your name'
                  />
                  <input
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                    className='outline-none p-2 border border-emerald-200 rounded-md'
                    placeholder='Email address'
                  />
                </div>
                <div className='my-2 space-y-2 font-semibold text-emerald-600 tracking-widest'>
                  <div className='flex'>
                    <p className='grow'>Subtotal: </p>
                    <p> GH₵{subtotal !== NaN ? subtotal : 0}</p>
                  </div>{" "}
                  <div className='flex'>
                    <p className='grow'>Delivery: </p>
                    <p> GH₵{deliveryPrice}</p>
                  </div>{" "}
                  <div className='flex  border-t border-dotted  border-emerald-400'>
                    <p className='grow'>Total: </p>
                    <p> GH₵{total !== NaN ? total : 0}</p>
                  </div>
                </div>
                {/* initiating stripe payment */}
                <input
                  hidden
                  readOnly
                  name='products'
                  value={selectedProducts?.join(",")}
                />{" "}
                <button
                  type='submit'
                  role='link'
                  disabled={subtotal === 0 ? true : false}
                  className='disabled:cursor-not-allowed my-3 border text-emerald-500 hover:bg-emerald-400 hover:text-white border-emerald-400 w-full p-2 rounded-md'>
                  Pay GH₵{total !== NaN ? total : deliveryPrice}
                </button>
              </form>
            </div>
          </>
        </div>
      </div>
      <Footer />
    </>
  );
}

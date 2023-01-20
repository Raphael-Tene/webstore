// @ts-nocheck

import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Footer from "../components/Footer";
import { ProductContext } from "../components/ProductsContext";

export default function checkout() {
  const { selectedProducts } = useContext(ProductContext);

  const [productInfo, setProductInfo] = useState([]);

  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    fetch("/api/products?ids=" + uniqIds.join(","))
      .then((response) => response.json())
      .then((json) => setProductInfo(json));
  }, [selectedProducts]);

  return (
    <div>
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
                <div className='grow'>${item.price}</div>
                <div>
                  <button className='border px-2 border-emerald-300 text-emerald-500 rounded-lg'>
                    -
                  </button>
                  {selectedProducts.filter((id) => id === item._id).length}
                  <button className='border px-2 text-white border-emerald-300 bg-emerald-500 rounded-lg'>
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      <Footer />
    </div>
  );
}

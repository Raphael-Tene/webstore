import Image from "next/image";
import React, { useContext } from "react";
import { ProductContext } from "./ProductsContext";

export default function ProductCard({
  _id,
  picture,
  name,
  price,
  description,
}) {
  // using useContext hook
  // @ts-ignore
  const { setSelectedProducts } = useContext(ProductContext);

  // this function tracks selected products
  function addProduct() {
    setSelectedProducts((prev) => [...prev, _id]);
  }

  return (
    <div className='w-64' key={_id}>
      <div className='rounded-xl bg-blue-100 p-5'>
        <Image
          className='object-contain'
          src={picture}
          width={200}
          height={300}
          alt={name}
        />
      </div>
      <div className='mt-2'>
        <h3 className='font-bold text-lg'>{name}</h3>
      </div>
      <p className='text-sm leading-4 mt-2'>{description}</p>
      <div className='flex mt-1 '>
        <div className='grow font-bold text-2xl'>${price}</div>
        <button
          onClick={addProduct}
          className='px-3 py-2 rounded-xl bg-emerald-400  text-white hover:opacity-50'>
          +
        </button>
      </div>
    </div>
  );
}

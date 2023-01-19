import Image from "next/image";
import React from "react";

export default function ProductCard({ picture, name, price, description }) {
  return (
    <div className='w-64' key={name}>
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
        <button className='px-3 py-2 rounded-xl bg-emerald-400  text-white hover:opacity-50'>
          +
        </button>
      </div>
    </div>
  );
}

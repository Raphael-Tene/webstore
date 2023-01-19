// @ts-nocheck
import React, { useEffect, useState } from "react";
import Head from "next/head";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [queryText, setQueryText] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  const categoriesNames = [
    ...new Set(products?.map((product) => product?.category)),
  ];

  let product;

  if (queryText) {
    product = products?.filter((product) =>
      product.name.toLowerCase().includes(queryText.toLowerCase())
    );
  } else {
    product = products;
  }

  return (
    <>
      <Head>
        <title>Webstore</title>
        <meta
          name='description'
          content='Learning to code by building real apps'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex justify-center p-4 md:max-w-2xl mx-auto items-center'>
        <input
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          type='text'
          placeholder='Search for products...'
          className='text-sm md:text-md  outline-none bg-gray-300 flex-grow p-2 rounded-md caret-slate-500'
        />
      </div>

      <main className='flex  items-center justify-center mx-auto'>
        <div className='mt-6  shadow-lg p-4 shadow-slate-600'>
          {categoriesNames?.map((category) => (
            <div>
              <h2
                key={category}
                className='text-2xl mt-2 text-gray-600 tracking-widest capitalize'>
                {category}
              </h2>
              <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-10'>
                {product
                  .filter((p) => p.category === category)
                  .map((product) => (
                    <div className='py-6 border-b-2'>
                      <ProductCard {...product} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

// export async function getServerSideProps() {
//   const products = await fetch("/api/products").then((response) =>
//     response.json()
//   );

//   return {
//     props: {
//       products,
//     },
//   };
// }

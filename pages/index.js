// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { ProductContext } from "../components/ProductsContext";

// Todo
// *Add a loading state and page
// *Add a no item found state
// *Show an error if something goes wrong
// !....................................! //

export default function Home() {
  // checking for a success purchase
  const { setSelectedProducts } = useContext(ProductContext);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (window.location.href.includes("success")) {
      setSelectedProducts([]);
      setSuccess(true);
    }
  }, []);

  const [products, setProducts] = useState([]);
  const [queryText, setQueryText] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      fetch("/api/products")
        .then((res) => res.json())
        .then((json) => setProducts(json));
    } catch (error) {
      setError(true);
    }
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
      {success && (
        <div className='flex items-center justify-center'>
          {" "}
          <div className='p-5 animate-pulse text-center  w-72'>
            {" "}
            <div className='mb-5 bg-emerald-300 text-white text-lg p-5 rounded-lg'>
              Thank you for your order
            </div>
          </div>
        </div>
      )}

      <div className='flex justify-center p-4 md:max-w-2xl mx-auto items-center'>
        <input
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          type='text'
          placeholder='Search for products...'
          className='text-sm md:text-md  outline-none bg-gray-300 flex-grow p-2 rounded-md caret-slate-500'
        />
      </div>
      {products.length > 0 && !error ? (
        <main className='flex  items-center justify-center mx-auto'>
          <div className='mt-6  shadow-lg p-4 shadow-slate-600'>
            {categoriesNames?.map((category) => (
              <div key={category}>
                {product.find((p) => p.category === category) && (
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
                )}
              </div>
            ))}
          </div>
        </main>
      ) : (
        <div className=' bg-black h-screen flex items-center justify-center p-4'>
          <div className='flex items-center border  border-white rounded-md shadow-md shadow-green-600 animate-pulse mx-auto justify-center'>
            <p className='text-white text-sm p-4 md:text-lg  whitespace-nowrap font-semibold text-center'>
              Loading Products...
            </p>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

// Todo
// *Enable sever side data fetching

// export async function getServerSideProps() {
//   const products = await productClient();
//   return {
//     props: {
//       products: JSON.parse(JSON.stringify(products)),
//     },
//   };
// }

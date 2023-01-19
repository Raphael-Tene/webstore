import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productData = fetch("/api/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);
  console.log(products);
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
      <main>
        <div className='p-5'>
          <div>
            <h2 className='text-2xl text-gray-600 tracking-widest'>Mobiles</h2>
            <div className='py-4'>
              <div className='w-64'>
                <div className='rounded-xl bg-blue-100 p-5'>
                  <Image
                    className='object-contain'
                    src='/products/iphone.png'
                    width={200}
                    height={300}
                    alt='iphone'
                  />
                </div>
                <div className='mt-2'>
                  <h3 className='font-bold text-lg'>Iphone 14</h3>
                </div>
                <p className='text-sm leading-4 mt-2'>
                  Excepteur cupidatat voluptate ipsum non deserunt exercitation
                  duis cillum amet adipisicing aliqua.
                </p>
                <div className='flex mt-1 '>
                  <div className='grow font-bold text-2xl'>$899</div>
                  <button className='px-3 py-2 rounded-xl bg-emerald-400  text-white hover:opacity-50'>
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
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

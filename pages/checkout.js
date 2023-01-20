import React, { useContext, useState, useEffect } from "react";
import Footer from "../components/Footer";
import { ProductContext } from "../components/ProductsContext";

export default function checkout() {
  // @ts-ignore
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
          <div>
            {
              // @ts-ignore
              item._id
            }
          </div>
        ))}
      <Footer />
    </div>
  );
}

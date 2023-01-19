import React from "react";
import { createContext, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

export const ProductContext = createContext({});

export function ProductContextProvider({ children }) {
  // using local storage state to persist select products
  const [selectedProducts, setSelectedProducts] = useLocalStorageState("cart", {
    defaultValue: [],
  });

  return (
    <ProductContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

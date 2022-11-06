import React, { useEffect, createContext, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayProducts from "./Components/DisplayProducts";
import Header from "./Components/Header";
import Portal from "./Components/Portal";
import Product from "./Components/Product";
import "./Components/styles.css";
import "./App.css";

export const ProductsContext = createContext();
function App() {
  const handleSearch = (search_name) => {
    dispatch({ type: "search", s_value: search_name });
  };
  const filterByCategory = (category) => {
    dispatch({ type: "category_filter", category: category });
  };

  // add item
  const handle_cart_add = (id) => {
    dispatch({ type: "add", id: id });
  };

  //remove item
  const handle_cart_remove = (id) => {
    dispatch({ type: "remove", id: id });
  };

  //open portal
  const handle_portal = (id) => {
    dispatch({ type: "portal", id: id });
  };
  //close portal
  const close_portal = () => {
    dispatch({ type: "close portal" });
  };
  //home reset
  const reset = () => {
    dispatch({ type: "reset" });
  };

  let initialState = {
    products: [],
    filtered_items: [],
    cart_items: [],
    isFiltering: false,
    cart_size: 0,
    isPortalOpen: false,
    portalProduct: [],
    reset: reset,
    handleSearch: handleSearch,
    filterByCategory: filterByCategory,
    handle_cart_add: handle_cart_add,
    handle_cart_remove: handle_cart_remove,
    handle_portal: handle_portal,
    close_portal: close_portal,
  };
  const [state, dispatch] = useReducer(productsReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      dispatch({ type: "fetch_success", data: data });
    };
    fetchData();
  }, []);
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <ProductsContext.Provider value={state}>
            <Header />

           
            {state.isPortalOpen ? <Product /> : ""}
          </ProductsContext.Provider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

function productsReducer(state, action) {
  let products = state.products;
  switch (action.type) {
    case "fetch_success":
      return { ...state, products: action.data };

    case "search":
      if (action.s_value !== "") {
        const searched_products = state.products.filter(
          (p) =>
            p.category.toLowerCase().includes(action.s_value.toLowerCase()) ||
            p.title.toLowerCase().includes(action.s_value.toLowerCase())
        );
        return {
          ...state,
          filtered_items: searched_products,
          isFiltering: true,
        };
      }
      return state;

    case "category_filter":
      const category_items = state.products.filter(
        (p) => p.category === action.category
      );
      return { ...state, filtered_items: category_items, isFiltering: true };

    case "add":
      const products_quantity = state.products.map((p) => {
        if (p.id === action.id) {
          p.quantity = p.quantity ? p.quantity + 1 : 1;
        }

        return p;
      });
      return {
        ...state,
        products: products_quantity,
        cart_size: state.cart_size + 1,
      };
    case "remove":
      const new_products_quantity = state.products.map((p) => {
        if (p.id === action.id) {
          p.quantity = p.quantity - 1;
        }

        return p;
      });
      return {
        ...state,
        products: new_products_quantity,
        cart_size: state.cart_size - 1,
      };
    case "portal":
      const portal_product = state.products.filter((p) => p.id === action.id);
      return { ...state, isPortalOpen: true, portalProduct: portal_product };
    case "close portal":
      return { ...state, isPortalOpen: false };
    case "reset":
      console.log("resetting");
      return {
        ...state,
        filtered_items: [],
        isFiltering: false,
        isPortalOpen: false,
        portalProduct: [],
      };

    default:
      return state;
  }
}

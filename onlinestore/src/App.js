import React, { useEffect, createContext, useReducer } from "react";
import DisplayProducts from "./Components/DisplayProducts";
import Header from "./Components/Header";
import "./Components/styles.css";

export const ProductsContext = createContext();
function App() {
  const handleSearch = (search_name) => {
    //console.log(search_name);
    dispatch({ type: "search", s_value: search_name });
  };
  const filterByCategory = (category) => {
    dispatch({ type: "category_filter", category: category });
  };

  let initialState = {
    products: [],
    filtered_items: [],
    isFiltering: false,
    handleSearch: handleSearch,
    filterByCategory: filterByCategory,
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
    <div>
      <ProductsContext.Provider value={state}>
        <Header />
        <DisplayProducts />
      </ProductsContext.Provider>
    </div>
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
    default:
      return state;
  }
}

import React, { useEffect, createContext, useReducer } from "react";
import DisplayProducts from "./Components/DisplayProducts";
import Header from "./Components/Header";
import "./Components/styles.css";

export const ProductsContext = createContext();
function App() {
  const handleSearch = (search_name) => {
    //console.log(search_name);
    dispatch({type:'search', s_value:search_name})
  };

  let initialState = {
    products: [],
    handleSearch: handleSearch,
  };
  const [state, dispatch] = useReducer(productsReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      //console.log(data);
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
  let products = state.products
  switch (action.type) {
    case "fetch_success":
      return {...state, products:action.data};

    case "search":
console.log(products);
      return state;  
    default:
      return state;
  }
}

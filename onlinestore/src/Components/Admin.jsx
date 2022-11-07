import React, { useEffect, useState, useReducer } from "react";

function Admin() {
  let [categories, setCategories] = useState();
  let [limit, setLimit] = useState()

  const initialState = {
    products: [],
    filtered: [],
    isFiltering: false,
    isSorting: false,
    sorted: [],

    categories: "",
  };

  const [state, dispatch] = useReducer(adminReducer, initialState);
  useEffect(() => {
    const fetchData = async () => {
      //all data initially
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();


      //fetch categories
      const resCategories = await fetch('https://fakestoreapi.com/products/categories')
      const categories_data = await resCategories.json();

      setCategories(categories_data);
      dispatch({ type: "all", data: data });
    };
    fetchData();
  }, []);

  
//handle sort
  const handleSort = async (e) => {
    let order = e.target.value;
    let res = await fetch(`https://fakestoreapi.com/products?sort=${order}`);
    let data = await res.json();
    dispatch({ type: "sort_or_limit", data: data });
  };

  //select category
  const handleSelect = (e) => {
    dispatch({ type: "select", select_value: e.target.value });
  };

  //limit data 
  const handle_limit_input = async (e)=>{
    let limit = +e.target.value
    let res = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
    let data = await res.json();
    dispatch({ type: "sort_or_limit", data: data });
    
  }

  return (
    <div className="tableProducts">
      <div className="table_wrapper">
        <div className="table_controls">
          <span className="select_span">
            <select onChange={(e) => handleSelect(e)}>
              <option value="all">All Items</option>
              {categories
                ? categories.map((c) => {
                    return <option value={c}>{c}</option>;
                  })
                : ""}
            </select>
          </span>
          <span className="sort_limit">
            <select onChange={handleSort}>
              <option value="desc">Desceding</option>
              <option value="asc">Ascending</option>
            </select>

            <input type="number" placeholder={`Enter limit betwwen 1 and ${state.filtered.length}`} value={limit} onChange={handle_limit_input}  min= '1' max={state.products.length}/>
          </span>
        </div>
        {state.filtered.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Product name</th>
                <th>Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {state.filtered.map((p) => {
                let { id, title, price, category, quantity } = p;
                return (
                  <tr key={id}>
                    <td>{category}</td>
                    <td>{title}</td>
                    <td>{price}</td>
                    <td>:</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
}

export default Admin;

function adminReducer(state, action) {
  switch (action.type) {
    case "all":
      return { ...state, products: action.data, filtered: action.data };
    case "select":
      if (action.select_value === "all")
        return { ...state, filtered: state.products };
      let selectedP = state.products.filter(
        (p) => p.category.toLowerCase() === action.select_value.toLowerCase()
      );

      return { ...state, filtered: selectedP };
    case "sort_or_limit":
      //console.log(action.data);
      return { ...state, filtered: action.data };
  }
}

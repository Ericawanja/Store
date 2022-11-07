import React, { useEffect, useState, useReducer } from "react";

function Admin() {
  let [categories, setCategories] = useState();
  let [isSorting, setIssorting] = useState(false);
  let [order, setOrder] = useState("asc");

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
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      let arr_categories = [];
      data.map((p) => {
        arr_categories.push(p.category);
      });
      let category_set = new Set(arr_categories);
      setCategories(Array.from(category_set));
      dispatch({ type: "all", data: data });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchParticularData = async () => {
      if (isSorting) {
        let res = await fetch(
          `https://fakestoreapi.com/products?sort=${order}`
        );
        let data = await res.json();
        console.log(data);
        dispatch({ type: "all", data: data });
      }
    };
    fetchParticularData();
  }, [isSorting]);

  const handleSort = async (e) => {
    let order = e.target.value;
    let res = await fetch(`https://fakestoreapi.com/products?sort=${order}`);
    let data = await res.json();
    dispatch({ type: "sorting", data: data });
  };

  const handleSelect = (e) => {
    dispatch({ type: "select", select_value: e.target.value });
  };

  return (
    <div className="tableProducts">
      <div className="table_wrapper">
        <select onChange={(e) => handleSelect(e)}>
          <option value="all">All Items</option>
          {categories
            ? categories.map((c) => {
                return <option value={c}>{c}</option>;
              })
            : ""}
        </select>
        <select onChange={handleSort}>
          <option value="desc">Desceding</option>
          <option value="asc">Ascending</option>
        </select>
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
    case 'sorting':
      //console.log(action.data);
      return {...state, filtered:action.data}  
  }
}

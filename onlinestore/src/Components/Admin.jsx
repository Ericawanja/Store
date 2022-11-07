import React, { useEffect, useState, useReducer } from "react";
import AdminProductPortal from "./AdminProductPortal";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

function Admin() {
  let [adminportal_open, setadminPortal_open] = useState(false);
  let [portal_id, set_portal_id] = useState();
  let [form_open, setForm_open] = useState(false);

  const initialState = {
    products: [],
    filtered: [],
    isFiltering: false,
    isSorting: false,
    sorted: [],

    categories: [],
  };

  const [state, dispatch] = useReducer(adminReducer, initialState);
  useEffect(() => {
    const fetchData = async () => {
      //all data initially
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      //fetch categories
      const resCategories = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const categories_data = await resCategories.json();
      let payload = { data, categories_data };

      dispatch({ type: "all", payload: payload });
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
  const handle_limit_input = async (e) => {
    let _limit = +e.target.value;
    let res = await fetch(
      `https://fakestoreapi.com/products?limit=${_limit}||`
    );
    let data = await res.json();
    dispatch({ type: "sort_or_limit", data: data });
  };

  //handle portal

  const handle_portal = (p_id) => {
    set_portal_id(p_id);
    setadminPortal_open(true);
  };

  //add form

  const handle_add_form = () => {
    setForm_open(true);
  };
  return (
    <>
      <div className="tableProducts">
        <div className="table_wrapper">
          <div className="table_controls">
            <span className="select_span">
              <select onChange={(e) => handleSelect(e)}>
                <option value="all">All Items</option>
                {state.categories
                  ? state.categories.map((c) => {
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

              <input
                type="number"
                placeholder={`Enter limit betwwen 1 and ${state.filtered.length}`}
                onChange={handle_limit_input}
                min="1"
                max={state.products.length}
              />

              <span className="add" onClick={handle_add_form}>
                +{" "}
              </span>
            </span>
          </div>
          {state.filtered.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Product name</th>
                  <th>Price</th>
                  <th className="edit_icon">Delete</th>
                </tr>
              </thead>
              <tbody>
                {state.filtered.map((p) => {
                  let { id, title, price, category, quantity } = p;
                  return (
                    <tr key={id} onClick={() => handle_portal(id)}>
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
      {adminportal_open && (
        <AdminProductPortal
          id={portal_id}
          setadminPortal_open={setadminPortal_open}
        />
      )}
      { form_open && <div className="form_container">
        <div>
          <span
            className="close_ad_portal_icon"
            onClick={() => setForm_open(false)}
          >
            <IconContext.Provider value={{ size: "30px", color: "white" }}>
              <AiOutlineClose />
            </IconContext.Provider>
          </span>

          <label htmlFor="title">Enter Title</label>
          <input type="text" name="title" />

          <label htmlFor="category">Enter Category</label>
          <input type="text" name="category" />

          <label htmlFor="price">Enter Price</label>
          <input type="nummber" name="price" />

          <label htmlFor="description">Enter Description</label>
          <textarea type="text" name="desc" rows="10" cols="25" />

          <span className="add_btns">
            <button className="cancel">save</button>
            <button className="save">Save</button>
          </span>
        </div>
      </div>}
    </>
  );
}

export default Admin;

function adminReducer(state, action) {
  switch (action.type) {
    case "all":
      return {
        ...state,
        products: action.payload.data,
        filtered: action.payload.data,
        categories: action.payload.categories_data,
      };
    case "select":
      if (action.select_value === "all")
        return { ...state, filtered: state.products };
      let selectedP = state.products.filter(
        (p) => p.category.toLowerCase() === action.select_value.toLowerCase()
      );

      return { ...state, filtered: selectedP };
    case "sort_or_limit":
      return { ...state, filtered: action.data };
  }
}

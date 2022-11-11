import React, { useEffect, useState, useReducer } from "react";
import AdminProductPortal from "./AdminProductPortal";
import { IconContext } from "react-icons";
import { AiOutlineClose, AiOutlineMore } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import Popup from "./Popup";

function Admin() {
  //popup state
  const [popup, setPopup] = useState(false);
  const [popup_details, setPopup_details] = useState({
    action: "",
    data: [],
  });

  let [table_icons, setTable_icons] = useState(false);
  let [isediting, setIsEditing] = useState(false);
  let [adminportal_open, setadminPortal_open] = useState(false);
  let [portal_id, set_portal_id] = useState();
  let [form_open, setForm_open] = useState(false);
  let [formDetails, setFormDetails] = useState({
    title: "",
    desc: "",
    price: "",
    category: "",
    image: "",
  });

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

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handle_form_submit = async () => {
    if (isediting) {
      const edit_p = await fetch("https://fakestoreapi.com/products/7", {
        method: "PUT",
        body: JSON.stringify({
          title: "test product",
          price: 13.5,
          description: "lorem ipsum set",
          image: "https://i.pravatar.cc",
          category: "electronic",
        }),
      });
      const res = await edit_p.json();
      setPopup_details({ action: "edit", data: res }); //passes details to the popup
      setPopup(true); //opens the popup
    } else {
      const send = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify({
          title: "test product",
          price: 13.5,
          description: "lorem ipsum set",
          image: "https://i.pravatar.cc",
          category: "electronic",
        }),
      });
      const res = await send.json();
      setPopup_details({ action: "add", data: res }); //passes details to the popup
      setPopup(true); //opens the popup
    }
    setForm_open(false);
  };

  const handleEdit = (id) => {
    const product = state.products.filter((p) => p.id === id);

    setFormDetails({
      ...formDetails,
      title: product[0].title,
      price: product[0].price,
      category: product[0].category,
      desc: product[0].description,
      image: product[0].image,
    });
    setForm_open(true);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    setTable_icons(false);
    const del = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });
    const res = await del.json();
    setPopup_details({action:'delete', data:res});
    setPopup(true);
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
                    <tr key={id}>
                      <td onClick={() => handle_portal(id)}>{category}</td>
                      <td onClick={() => handle_portal(id)}>{title}</td>
                      <td onClick={() => handle_portal(id)}>{price}</td>
                      <td className="table_edit_icon">
                        {table_icons ? (
                          <div className="edit_delete_icons">
                            <span
                              className="edit"
                              onClick={() => handleEdit(id)}
                            >
                              <IconContext.Provider
                                value={{ color: "black", size: "24px" }}
                              >
                                <BiEditAlt />
                              </IconContext.Provider>
                            </span>
                            <span
                              className="delete"
                              onClick={() => handleDelete(id)}
                            >
                              <IconContext.Provider
                                value={{ color: "black", size: "24px" }}
                              >
                                <RiDeleteBin6Fill />
                              </IconContext.Provider>
                            </span>
                          </div>
                        ) : (
                          <span
                            className="table_row_more"
                            onClick={() => setTable_icons(true)}
                          >
                            <IconContext.Provider
                              value={{ size: "30px", color: "black" }}
                            >
                              <AiOutlineMore />
                            </IconContext.Provider>
                          </span>
                        )}
                      </td>
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
      {form_open && (
        <div className="form_container">
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
            <input
              type="text"
              name="title"
              onChange={handleInput}
              value={formDetails.title}
            />

            <label htmlFor="category">Enter Category</label>
            <input
              type="text"
              name="category"
              onChange={handleInput}
              value={formDetails.category}
            />

            <label htmlFor="price">Enter Price</label>
            <input
              type="text"
              name="price"
              onChange={handleInput}
              value={formDetails.price}
            />

            <label htmlFor="image">Enter Image url</label>
            <input
              type="text"
              name="image"
              onChange={handleInput}
              value={formDetails.image}
            />

            <label htmlFor="description">Enter Description</label>
            <textarea
              type="text"
              name="desc"
              rows="10"
              cols="25"
              onChange={handleInput}
              value={formDetails.desc}
            />

            <span className="add_btns">
              <button className="cancel" onClick={() => setForm_open(false)}>
                Cancel
              </button>
              <button className="save" onClick={(e) => handle_form_submit(e)}>
                Save
              </button>
            </span>
          </div>
        </div>
      )}
      {popup && <Popup setPopup= {setPopup} popup_details = {popup_details}/>}
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
    default:
      return state;
  }
}

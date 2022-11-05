import React, { useState, useContext, useRef } from "react";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { IconContext } from "react-icons";

import { ProductsContext } from "../App";
import { useEffect } from "react";

function Header() {
  let inputId = useRef();
  const { handleSearch, products, filterByCategory, cart_size, reset } =
    useContext(ProductsContext);
  let [search, setSearch] = useState("");
  const handleSearchInput = (event) => {
    setSearch(event.target.value);
    handleSearch(event.target.value);
  };
  const handleSearchSubmit = () => {
    if (search === "") {
      return inputId.current.focus();
    }
    handleSearch(search);
  };

  let arr_categories = [];
  products.map((p) => {
    arr_categories.push(p.category);
  });
  let category_set = new Set(arr_categories);
  let categories = Array.from(category_set);
  console.log();

  return (
    <div className="header">
      <div className="menu">
        <div className="icons_home_category">
          <span  onClick={reset}>
            <IconContext.Provider
              value={{ size: "30px", color: "black" }}
             
            >
              <AiOutlineHome />
            </IconContext.Provider>
          </span>
          <div className="categoriesWrapper">
            <span className="icon_category">
              Category{" "}
              <IconContext.Provider value={{ size: "30px", color: "black" }}>
                <IoMdArrowDropdown />
              </IconContext.Provider>{" "}
            </span>
            <div className="categories">
              {categories.map((p, index) => {
                return (
                  <span key={index} onClick={() => filterByCategory(p)}>
                    {p}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="search">
        <input
          ref={inputId}
          type="text"
          value={search}
          name="search"
          onChange={(e) => handleSearchInput(e)}
          placeholder="Search products, categories"
        />
        <button onClick={() => handleSearchSubmit()}>Search</button>
      </div>
      <div className="cart">
        <IconContext.Provider value={{ size: "30px", color: "black" }}>
          <AiOutlineShoppingCart />
        </IconContext.Provider>
        <span className="cart_items">{cart_size}</span>
      </div>
    </div>
  );
}

export default Header;

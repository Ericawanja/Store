import React, { useState, useContext, useRef } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { IconContext } from "react-icons";

import { ProductsContext } from "../App";
import { useEffect } from "react";

function Header() {
  let inputId = useRef();
  const { handleSearch, products, filterByCategory } = useContext(ProductsContext);
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

  const filterCategories= (p)=>{
    filterByCategory(p)
  }

  let arr_categories = [];
  products.map((p) => {
    arr_categories.push(p.category);
  });
  let category_set = new Set(arr_categories);
  let categories = Array.from(category_set);
  console.log();

  return (
    <div className="header">
      <div>
        <div className="menu">
          <div className="icons_home_category">
            <IconContext.Provider value={{ size: "30px", color: "black" }}>
              <AiOutlineMenuUnfold />
            </IconContext.Provider>
            <div className="categoriesWrapper">
              <span className="icon_category">
                Category{" "}
                <IconContext.Provider value={{ size: "30px", color: "black" }}>
                  <IoMdArrowDropdown />
                </IconContext.Provider>{" "}
              </span>
              <div className="categories">
                {categories.map((p, index) => {
                  return <span key={index} onClick={()=>filterCategories(p)}>{p}</span>;
                })}
              </div>
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
    </div>
  );
}

export default Header;

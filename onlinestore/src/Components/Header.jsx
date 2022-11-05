import React, { useState, useContext} from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IconContext } from "react-icons";

import { ProductsContext } from "../App";

function Header() {
    const {handleSearch} = useContext(ProductsContext);
  let [search, setSearch] = useState("");
  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  };
  const handleSearchSubmit = () => {
    handleSearch(search)
    // dispatch({type:'search', value:search})
  };
  return (
    <div>
      <div className="menu">
        <IconContext.Provider value={{ size: "30px", color: "black" }}>
          <AiOutlineMenuUnfold />
        </IconContext.Provider>
      </div>
      <div className="search">
        <input
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

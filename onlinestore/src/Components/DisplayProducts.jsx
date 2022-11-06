import React, { useContext } from "react";
import { useEffect } from "react";
import { ProductsContext } from "../App";

function DisplayProducts() {
  const { products, filtered_items, isFiltering, handle_cart_add, handle_cart_remove, handle_portal } =
    useContext(ProductsContext);
  const products_to_display = isFiltering ? filtered_items : products;

  

  
  // useEffect(() => {}, [isFiltering]);
  return (
    <div>
      <div className="productsWrapper">
        {products_to_display.length === 0
          ? "loading"
          : products_to_display.map((p) => {
              let { id, title, price, category, description, image, quantity } =
                p;
              return (
                <div className="product" key={id} >
                  <div className="product_details" onClick ={()=> handle_portal(id)}>
                    <div className="product_img">
                      <img src={image} alt="product" />
                    </div>
                    <div className="title">{title}</div>
                    <div className="price">$ {price}</div>
                  </div>

                  <div className="add_to_cart">
                    {quantity ? (
                      <div className="addIcons">
                        <button onClick={() =>   handle_cart_add(id)}>+</button>
                        {quantity}
                        <button onClick={() =>  handle_cart_remove(id)}>-</button>
                      </div>
                    ) : (
                      <button onClick={() => handle_cart_add(id)}>
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default DisplayProducts;

import React, { useContext } from "react";
import { useEffect } from "react";
import { ProductsContext } from "../App";

function DisplayProducts() {
  const { products, filtered_items, isFiltering, handle_cart_add, handle_cart_remove, handle_portal } =
    useContext(ProductsContext);
  const products_to_display = isFiltering ? filtered_items : products;

  const handleCartAdd = (id) => {
    handle_cart_add(id);
  };

  const handleCartRemove= (id)=>{
    handle_cart_remove(id)
  }

  const handlePortal = (id)=>{
    handle_portal(id)
  }
  useEffect(() => {}, [isFiltering]);
  return (
    <div>
      <div className="productsWrapper">
        {products_to_display.length === 0
          ? "loading"
          : products_to_display.map((p) => {
              let { id, title, price, category, description, image, quantity } =
                p;
              return (
                <div className="product" key={id} onClick ={()=>handlePortal(id)}>
                  <div className="product_details">
                    <div className="product_img">
                      <img src={image} alt="product" />
                    </div>
                    <div className="title">{title}</div>
                    <div className="price">$ {price}</div>
                  </div>

                  <div className="add_to_cart">
                    {quantity ? (
                      <div className="addIcons">
                        <button onClick={() => handleCartAdd(id)}>+</button>
                        {quantity}
                        <button onClick={() => handleCartRemove(id)}>-</button>
                      </div>
                    ) : (
                      <button onClick={() => handleCartAdd(id)}>
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

import React, { useContext } from "react";
import { useEffect } from "react";
import { ProductsContext } from "../App";

function DisplayProducts() {
  const { products, filtered_items, isFiltering } = useContext(ProductsContext);
  const products_to_display = isFiltering ? filtered_items : products;
//   console.log(filtered_items);
//   console.log(products_to_display);
  useEffect(()=>{

  }, [isFiltering])
  return (
    <div>
      <div className="productsWrapper">
        {products_to_display.length === 0
          ? "loading"
          : products_to_display.map((p) => {
              let { id, title, price, category, description, image } = p;
              return (
                <div className="product" key={id}>
                  <div className="product_details">
                    <div className="product_img">
                      <img src={image} alt="product" />
                    </div>
                    <div className="title">{title}</div>
                    <div className="price">$ {price}</div>
                  </div>

                  <div className="add_to_cart">
                    <button>Add to cart</button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default DisplayProducts;

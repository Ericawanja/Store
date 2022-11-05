import React, { useContext } from "react";
import { ProductsContext } from "../App";

function DisplayProducts() {
  const {products} = useContext(ProductsContext);

  return (
    <div>
      <div className="productsWrapper">
        {products.length === 0 
          ? "loading"
          : products.map((p) => {
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

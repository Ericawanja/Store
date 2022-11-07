import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";
import { ProductsContext } from "../App";
import Portal from "./Portal";
import "./styles.css";

function Product() {
  const {
    portalProduct,
    handle_cart_add,
    handle_cart_remove,
    handle_portal,
    close_portal,
  } = useContext(ProductsContext);

  const { id } = portalProduct[0];
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchDataProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      console.log(data);
    };
    fetchDataProduct();
  }, [id]);

  const { title, price, description, category, image, rating, quantity } =
    product;

  return (
    // <Portal>
    <>
      {product.title ? (
        <div className="product_details_portal">
          <div className="inner_product_wrapper">
            <span className="close_portal_icon" onClick={() => close_portal()}>
              <IconContext.Provider value={{ size: "30px", color: "black" }}>
                <AiOutlineClose />
              </IconContext.Provider>
            </span>
            <div className="left_right">
              <div className="left">
                <div className="portal_img">
                  <img src={image} alt="" />
                </div>
              </div>

              <div className="portal_product_details">
                <div className="portal_title">{title}</div>
                <div className="portal_price">$ {price}</div>
                <div className="add_to_cart">
                  {quantity ? (
                    <div className="addIcons">
                      <button onClick={() => handle_cart_add(id)}>+</button>
                      {quantity}
                      <button onClick={() => handle_cart_remove(id)}>-</button>
                    </div>
                  ) : (
                    <button onClick={() => handle_cart_add(id)}>
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="portal_desc"> {description}</div>
          </div>
        </div>
      ) : (
        "loading"
      )}
    </>
  );
}

export default Product;

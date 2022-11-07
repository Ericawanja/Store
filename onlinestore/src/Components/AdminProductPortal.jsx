import React, { useEffect, useState } from "react";

import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

import "./styles.css";
function AdminProductPortal({ id }) {
  let [product, setProduct] = useState([]);

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
    <>
      <div className="admin_portal_wrapper">
        <div className="admin_portal">
          <div className="admin_image">
            <img src={image} alt="product" />
          </div>
          <div className="p_details">
            <span className="title">{title}</span>
            <span className="price">Price: {price}</span>
            <span className="cetagory">Category: {category}</span>
            <span className="desc">{description}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminProductPortal;

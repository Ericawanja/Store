import React, { useEffect, useState } from "react";

function Admin() {
  const [products, setProducts] = useState();
  const [dataType, setDataType] = useState("all");
  let [categories, setCategories] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      let arr_categories = [];
      data.
        map((p) => {
          arr_categories.push(p.category);
        });
      let category_set = new Set(arr_categories);
      setCategories(Array.from(category_set));
    };
    fetchData();
  }, [dataType]);
 
  return (
    <div className="tableProducts">
      <div className="table_wrapper">
        <select>
          <option value="all">All Items</option>
          {categories ? categories.map((c)=>{
            return  <option value="all">{c}</option>
          }):''}
        </select>
        {products ? (
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Product name</th>
                <th>Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                let { id, title, price, category, quantity } = p;
                return (
                  <tr key={id}>
                    <td>{category}</td>
                    <td>{title}</td>
                    <td>{price}</td>
                    <td>:</td>
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
  );
}

export default Admin;

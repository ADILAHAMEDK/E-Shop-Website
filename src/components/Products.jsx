import axios from "axios";
import React, { useEffect, useState } from "react";

const Products = ({ refresh }) => {
  const [data, setData] = useState([]);
  const [editProduct, setEditProduct] = useState(null); // State to manage the product being edited
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
  });

  // Fetch products
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products/");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (product) => {
    setEditProduct(product._id); // Set the current product being edited
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      countInStock: product.countInStock,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${editProduct}`, formData);
      getProducts(); // Refresh the product list after update
      setEditProduct(null); // Clear the editing state
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-3 max-w-[1490px] mx-auto mt-10">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Price</th>
            <th className="p-2">Stock</th>
            <th className="p-2">image</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr className="border-b" key={item._id}>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.description}</td>
              <td className="p-2">${item.price}</td>
              <td className="p-2">{item.countInStock}</td>
              <td className="p-2"><img src={item.image} className="w-[50px]" alt="" /></td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-2 py-1 bg-red-800 text-white rounded mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdate(item)}
                  className="px-2 py-1 bg-blue-800 text-white rounded"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editProduct && (
        <form onSubmit={handleFormSubmit} className="mt-6 bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Update Product</h3>
          <div className="mb-3">
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Stock:</label>
            <input
              type="number"
              name="countInStock"
              value={formData.countInStock}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
            Submit Update
          </button>
        </form>
      )}
    </div>
  );
};

export default Products;

import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Products from './Products'

const AddProducts = () => {
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        countInStock: "",
        image: "", // To hold the Base64 image data
    });

    const [refresh, setRefresh] = useState(false); // State to trigger refresh

    // Handle input field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    }

    // Handle image upload and convert to Base64
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProductData({ ...productData, image: reader.result });
        }
        if (file) {
            reader.readAsDataURL(file); // Convert image to Base64 string
        }
    }

    // Handle adding products
    const handleAddProducts = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/products/", productData);
            console.log(response, "addproducts........");
            toast.success("Product Added Successfully");

            // Clear input fields after product is added
            setProductData({
                name: "",
                description: "",
                price: "",
                countInStock: "",
                image: "", // Reset the image field as well
            });

            // Trigger refresh after adding the product
            setRefresh(!refresh);

        } catch (error) {
            console.log(error.message);
            toast.error("Failed To Add Product");
        }
    }

    return (
        <div className='max-w-[600px] mx-auto mt-10'>
            <div className='border'>
                <h1 className='text-center text-lg mt-2'>Add Products</h1>
                <div className='px-5 py-2'>
                    <input type="text" name='name' value={productData.name} onChange={handleInputChange} placeholder='Name' className='border block w-full mt-2 px-2 py-1' />
                    <input type="text" name='description' value={productData.description} onChange={handleInputChange} placeholder='Description' className='border block w-full mt-2 px-2 py-1' />
                    <input type="text" name='price' value={productData.price} onChange={handleInputChange} placeholder='Price' className='border block w-full mt-2 px-2 py-1' />
                    <input type="text" name='countInStock' value={productData.countInStock} onChange={handleInputChange} placeholder='Stock' className='border block w-full mt-2 px-2 py-1' />
                    
                    {/* File input for image */}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className='border block w-full mt-2 px-2 py-1' />
                </div>
                <button onClick={handleAddProducts} className='bg-black text-white px-2 py-1 rounded w-full mt-2'>Add</button>
            </div>

            {/* Pass the refresh state as a prop to the Products component */}
            <Products refresh={refresh} />
        </div>
    )
}

export default AddProducts;

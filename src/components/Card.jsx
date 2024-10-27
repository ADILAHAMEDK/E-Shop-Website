import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Card = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getProductsHome = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/products/");
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getProductsHome();
    }, []);

    return (
        <div className='px-5 py-10 max-w-[1490px] mx-auto'>
            <h1 className='text-3xl font-bold text-center mb-8 '>Featured Products</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {data.map((product) => (
                    <div key={product.id} className='bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105'>
                        <img src={product.image} alt={product.name} className='w-full h-64 object-cover' />
                        <div className='p-6'>
                            <h2 className='text-xl font-semibold text-gray-800'>{product.name}</h2>
                            <p className='text-gray-500'>${product.price}</p>
                            <p className='text-gray-600 mt-2'>{product.description}</p>
                            <button className='mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200'>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;

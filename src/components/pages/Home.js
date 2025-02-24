import React, { useState, useEffect } from "react";
import { ProductList } from '../ProductList';
import { SideBar } from '../SideBar';

export const Home = () => {
    const [products, setProducts] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);

    // Dynamically set API URL based on environment
    const baseUrl = process.env.NODE_ENV === "development"
        ? "http://localhost:8000"
        : "https://your-netlify-site.netlify.app"; // Replace with actual Netlify URL

        useEffect(() => {
            fetch(`${baseUrl}/products`)
                .then(res => res.json())
                .then(data => setProducts(data))
                .catch(error => console.error('Error fetching products:', error));
        }, [baseUrl]);

    return ( 
        <>
            <SideBar setSelectedBrand={setSelectedBrand} />
            <div className="home">
                {products && <ProductList selectedBrand={selectedBrand} products={products} title="Available Products" />}
            </div>
        </>
    );
}

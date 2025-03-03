import React, { useState, useEffect } from "react";
import { ProductList } from "../ProductList";
import { SideBar } from "../SideBar";

export const Home = () => {
    const [products, setProducts] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);

    // Use correct API base URL (switch for local vs. production)
    const baseUrl = process.env.NODE_ENV === "development"
        ? "http://localhost:8000"
        : "https://your-json-server-url.com"; // Replace with actual backend URL

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${baseUrl}/products`);
                const data = await res.json();
                setProducts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [baseUrl]);

    return (
        <>
            <SideBar setSelectedBrand={setSelectedBrand} />
            <div className="home">
                {products.length > 0 ? (
                    <ProductList selectedBrand={selectedBrand} products={products} title="Available Products" />
                ) : (
                    <p>Loading products...</p>
                )}
            </div>
        </>
    );
};

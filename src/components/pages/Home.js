import React from 'react';
import { useState, useEffect } from "react";
import { ProductList } from '../ProductList';
import { SideBar } from '../SideBar';

export const Home = () => {
    const [products, setProducts] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null); // Add this line

    useEffect(() => {
        fetch('http://localhost:8000/products')
        .then(res => {
            return res.json();
        })
        .then(data => {
            setProducts(data)
        })
    }, []);

    return ( 
        <>
        <SideBar setSelectedBrand={setSelectedBrand} />
        <div className="home">
            {products && <ProductList selectedBrand={selectedBrand} products={products} title="Availble Products" />}
        </div>
        </>
    );
}

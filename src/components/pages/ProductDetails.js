import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BsFillStarFill, BsShare, BsChevronDoubleLeft } from "react-icons/bs";
import { useCart } from '../CartContext';
import "./ProductDetails.css";

const ProductDetails = ({ rating }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8000/products/${id}`);
                if (!response.ok) throw new Error("Product not found");
                const data = await response.json();
                setProduct(data);
                setMainImage(data.image || "");
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div className="loading-container">Loading product details...</div>;
    }

    const handleAddToCart = () => addToCart(product);
    const handleImageClick = (event) => setMainImage(event.target.src);

    return (
        <div className="detail-container flex">
            <div className="details left">
                <div className="main-image" style={{ width: '600px', height: '600px' }}>
                    <img src={mainImage} alt={product.name} className="image slide" />
                </div>
                <div className="option flex">
                    {[product.image1, product.image2, product.image3, product.image4, product.image5]
                        .filter(Boolean)
                        .map((img, index) => (
                            <img key={index} className="optionImage" src={img} alt={`Option ${index + 1}`} onClick={handleImageClick} />
                        ))}
                </div>
            </div>
            <div className="right">
                <div className="share"><BsShare /></div>
                <button title="Back" className="backBtn" onClick={() => navigate(-1)}>
                    <BsChevronDoubleLeft />
                </button>
                <h2 className="productName">{product.name}</h2>
                <p className="description">Description: {product.description}</p>
                <h4>
                    <p className="price"><span>NGN</span>{product.price}</p>
                </h4>
                <h5 className="col-head">Normal Color</h5>
                <div className="color flex">
                    {Array(6).fill().map((_, i) => <span key={i}></span>)}
                </div>
                <div className="ratings">
                    {[...Array(5)].map((_, i) => (
                        <BsFillStarFill key={i} color={i + 1 <= rating ? "teal" : "#fb923c"} />
                    ))}
                </div>
                <h5>Number</h5>
                <div className="add flex1">
                    <span>-</span>
                    <label htmlFor="number of items">1</label>
                    <span>+</span>
                </div>
                <div className="actionBtns">
                    <button className="icon-cart addCart box-1" onClick={handleAddToCart}>Add To Cart</button>
                    <Link to="/checkout">
                        <button className="buy box-2">Buy Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BsFillStarFill, BsShare, BsChevronDoubleLeft } from "react-icons/bs";
import { useCart } from "../CartContext";
import "./ProductDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");

    const baseUrl = process.env.NODE_ENV === "development"
        ? "http://localhost:8000"
        : "https://your-json-server-url.com"; // Replace with actual backend URL

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${baseUrl}/products/${id}`);
                if (!res.ok) throw new Error("Product not found");
                const data = await res.json();
                setProduct(data);
                setMainImage(data.image); // Set default image
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id, baseUrl]);

    if (!product) return <p>Loading product details...</p>;

    return (
        <div className="detail-container flex">
            <div className="details left">
                <div className="main-image">
                    <img src={mainImage} alt={product.name} className="image slide" />
                </div>
                <div className="option flex">
                    {[product.image1, product.image2, product.image3, product.image4, product.image5].map(
                        (img, index) =>
                            img && <img key={index} className="optionImage" src={img} alt={`Option ${index + 1}`} onClick={() => setMainImage(img)} />
                    )}
                </div>
            </div>
            <div className="right">
                <div className="share">
                    <BsShare />
                </div>
                <button type="button" title="Back" className="backBtn" onClick={() => window.history.back()}>
                    <BsChevronDoubleLeft />
                </button>
                <h2 className="productName">{product.name}</h2>
                <p className="description">Description: {product.description}</p>
                <h4 className="price">NGN {product.price}</h4>

                <div className="ratings">
                    {[...Array(5)].map((_, i) => (
                        <BsFillStarFill key={i} color={i + 1 <= product.rating ? "teal" : "#fb923c"} />
                    ))}
                </div>

                <div className="actionBtns">
                    <button className="addCart" onClick={() => addToCart(product)}>
                        Add To Cart
                    </button>
                    <Link to="/checkout">
                        <button className="buy">Buy Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

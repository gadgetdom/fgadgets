    import React, { useEffect, useState } from 'react';
    import { useParams, Link } from 'react-router-dom';
    import { BsFillStarFill, BsShare, BsChevronDoubleLeft } from "react-icons/bs";
    import "./ProductDetails.css";
    import { useCart } from '../CartContext';




function ProductDetails( {rating} ) {

    const handleBackButtonClick = () => {
        window.history.back();
    };
    
    const { addToCart } = useCart();
    const handleAddToCart = (product) => {
        addToCart(product);
    };
        let { id } = useParams();
        const [product, setProduct] = useState(null);
        const [mainImage, setMainImage] = useState("");

        const handleOptionImageClick = (event) => {
            const selectedImage = event.target.src;
            setMainImage(selectedImage);
        };
        
        // Fetch product data when the component mounts
            useEffect(() => {
                fetch(`http://localhost:3000/products/${id}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);  // Log the fetched data
                    setProduct(data);
                })
                .catch(err => console.error(err));
            }, [id]);
            // Don't render anything until the product data has been fetched
            if (!product) return null;



    return (
        <div className="detail-container flex">
            <div className="details left">
            <div className="main-image" style={{ width: '600px', height: '600px' }}>
                <img
                src={mainImage || product?.image}
                alt="Product img"
                className="image slide"
                id="mainImage"
                />
            </div>
            <div className="option flex" id="optionImages">
                {product?.image1 && <img className="optionImage" src={product.image1} alt="1" onClick={handleOptionImageClick} />}
                {product?.image2 && <img className="optionImage" src={product.image2} alt="2" onClick={handleOptionImageClick} />}
                {product?.image3 && <img className="optionImage" src={product.image3} alt="3" onClick={handleOptionImageClick} />}
                {product?.image4 && <img className="optionImage" src={product.image4} alt="4" onClick={handleOptionImageClick} />}
                {product?.image5 && <img className="optionImage" src={product.image5} alt="5" onClick={handleOptionImageClick} />}
            </div>
            </div>
            <div className="right">
            <div className="share">
            <BsShare />
            </div>
            <button type="button" title="back button" className='backBtn' onClick={handleBackButtonClick}>
            <BsChevronDoubleLeft />
            </button>
                <h2 className="productName">{product.name}</h2>
                <p className="description">Description: {product.description}</p>
                <h4>
                    <p className="price">
                    <span>NGN</span>
                    {product.price}
                    </p>
                </h4>
                <h5 className="col-head">Normal Color</h5>
                <div className="color flex">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="ratings">
                    {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                        <label key={i}>
                        <BsFillStarFill
                            color={ratingValue <= rating ? "teal" : "#fb923c"}
                        />
                        </label>
                    );
                    })}
                </div>
                <h5>Number</h5>
                <div className="add flex1">
                    <span>-</span>
                    <label htmlFor="number of items">1</label>
                    <span>+</span>
                </div>

                <div className="actionBtns">
                    <button
                    title="Add to Cart button"
                    type="button"
                    className="icon-cart  addCart box-1" onClick={() => handleAddToCart(product)}>
                    Add To Cart
                    </button>
                    <Link to="/checkout">
                        <button
                            title="Buy button"
                            type="button"
                            className="buy box-2">
                            Buy Now
                        </button>
                    </Link>
                    
                </div>
            </div>
        </div>
        );
    }

    export default ProductDetails;

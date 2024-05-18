import { BsFillStarFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { Search } from './Search';
import { Link } from 'react-router-dom';
import { useCart } from "./CartContext";
import "./Product.css"

export const ProductList = ({ products, selectedBrand, title, rating }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    if (!products) {
        return null; // Remove the loading message
    }

    let filteredProducts = products;
    if (selectedBrand) {
        filteredProducts = products.filter(product => product.brand === selectedBrand);
    }

    if (filteredProducts.length === 0) {
        return <div>No products found for the selected brand.</div>;
    }

    return (
        <>
            {selectedBrand && <h2 className="brand-header">{selectedBrand}</h2>}
            <div className="tisea">
                <h2 className="title">{title}</h2><Search />
            </div>
            <div className="product-list">
                {filteredProducts.map((product) => (
                    <div className="product-preview" key={product.id}>
                        <div className="img-holder" style={{ width: '120px', height: '120px' }}>
                            <img src={product.image} alt="Pimage" style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div className="info-holder">
                            <p>{product.name}</p>
                            <h3 className="price">
                                <small>NGN</small>
                                {product.price}
                            </h3>
                            <div className="ratings">
                                {[...Array(5)].map((star, i) => {
                                    const ratingValue = i + 1;
                                    return (
                                        <label key={i}>
                                            <BsFillStarFill color={ratingValue <= rating ? 'teal' : '#fb923c'} />
                                        </label>
                                    );
                                })}
                            </div>
                            <Link to={`/product/${product.id}`}>
                                <button className="viewDetails">View Details</button>
                            </Link>
                            <button className="addToCart" onClick={() => handleAddToCart(product)}>
                                <FaCartPlus />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
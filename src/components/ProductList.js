import { BsFillStarFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./Product.css";

export const ProductList = ({ products, selectedBrand, title }) => {
    const { addToCart } = useCart();

    const filteredProducts = selectedBrand
        ? products.filter(product => product.brand === selectedBrand)
        : products;

    if (filteredProducts.length === 0) {
        return <div>No products found for the selected brand.</div>;
    }

    return (
        <>
            {selectedBrand && <h2 className="brand-header">{selectedBrand}</h2>}
            <h2 className="title">{title}</h2>
            <div className="product-list">
                {filteredProducts.map((product) => (
                    <div className="product-preview" key={product.id}>
                        <div className="img-holder">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="info-holder">
                            <p>{product.name}</p>
                            <h3 className="price">NGN {product.price}</h3>
                            <div className="ratings">
                                {[...Array(5)].map((_, i) => (
                                    <BsFillStarFill key={i} color={i + 1 <= product.rating ? "teal" : "#fb923c"} />
                                ))}
                            </div>
                            <Link to={`/product/${product.id}`}>
                                <button className="viewDetails">View Details</button>
                            </Link>
                            <button className="addToCart" onClick={() => addToCart(product)}>
                                <FaCartPlus />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

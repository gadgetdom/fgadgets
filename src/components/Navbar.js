import React, { useState, useEffect, useContext, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../logo.svg';
import { FaArrowRightToBracket } from "react-icons/fa6";
import { BsCart2, BsCollection, BsCompass, BsQrCodeScan, BsPerson, BsBell, BsChatRight, BsGear, BsWallet2, BsChevronDown, BsChevronUp, BsBackpack4 } from "react-icons/bs";
import "./Navbar.css";
import { useCart } from './CartContext';
import { CartModal } from './CartModal';
import AuthContext from '../AuthContext';
import 'firebase/compat/auth';

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [navbarColor, setNavbarColor] = useState('transparent');
    const { cart } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Use the AuthContext
    const { isLoggedIn, userName, handleLogout } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const changeNavbarColor = () => {
            if (window.scrollY >= 50) {
                setNavbarColor('#f3f4f6');
            } else {
                setNavbarColor('transparent');
            }
        };

        window.addEventListener('scroll', changeNavbarColor);
        return () => window.removeEventListener('scroll', changeNavbarColor);
    }, []);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    const getInitials = (name) => {
        let initials = name.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return initials;
    };

    const handleProfileClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav id="navbar" style={{ backgroundColor: navbarColor }}>
            <Link to="/" className="logo-holder">
                <img src={logo} alt="fg_Logo" className='logo' style={ { width: '3em'} } />
            </Link>
            <div className="menu" onClick={() => {setMenuOpen(!menuOpen);}}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : " "}>
                <li>
                    <NavLink to="/" className="nav-item"><BsCollection />
                    Products
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/download" className="nav-item"><BsQrCodeScan />
                    Download App
                    </NavLink>
                </li> 
                <li>
                    <NavLink to="/track" className="nav-item"><BsCompass />
                    Track Order
                    </NavLink>
                </li>
                <li>
                    {isLoggedIn ? (
                        <ul>
                        <li>
                            <NavLink to="/messages" className="nav-item inner">
                            <BsChatRight />Messages
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/orders" className="nav-item inner">
                            <BsBackpack4 />My Orders
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Notify" className="nav-item inner">
                            <BsBell />
                            </NavLink>
                        </li>
                        <div className="nav-item user-sets" onClick={handleProfileClick} ref={dropdownRef}><BsPerson />
                            <span>Hi, { userName ? userName.split(' ')[0] : "User"}  {showDropdown ? <BsChevronUp /> : <BsChevronDown />}</span>
                            <button>
                                {userName ? getInitials(userName) : ""}
                            </button>
                            {showDropdown && (
                                <div className="dropdown-content">
                                    <button onClick={handleLogout}>Logout</button>                                   <li>
                                        <NavLink to="/profile" className="nav-item">
                                        <BsPerson />Profile Details
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/payments" className="nav-item">
                                        <BsWallet2 />Payments
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/settings" className="nav-item">
                                        <BsGear />Settings
                                        </NavLink>
                                    </li>
                                </div>
                            )}
                        </div></ul>

                    ) : (
                        <NavLink to="/login" className="nav-item"><FaArrowRightToBracket />
                        Login
                        </NavLink>
                    )}
                </li>
            </ul>
            <div className="myCart" onClick={toggleCart}>
                <BsCart2 />
                <p>  {cart.length}</p>
            </div>
            {isCartOpen && <CartModal cart={cart} closeCart={closeCart} />}
        </nav>
    )
}
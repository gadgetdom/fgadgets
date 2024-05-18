import React, { useState } from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

export const SideBar = ({ setSelectedBrand, selectedBrand }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const clearBrandFilter = () => {
        setSelectedBrand(null);
    };

    return (
        <>
            <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <h2>Top Brands</h2>
                <button className="sideBtn" onClick={() => { setIsClicked(!isClicked); toggleSidebar(); }}>
                    {isClicked ? <BsChevronDoubleRight /> : <BsChevronDoubleLeft />}
                </button>
                <button
                    style={{
                        display: "block",
                        marginTop: "30px",
                        padding: "8px 30px",
                        backgroundColor: "#374151",
                        color: "#fff",
                        border: "none",
                        width: "100%",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "background-color 0.3s"
                    }}
                    onClick={clearBrandFilter}
                    >
                    All Brands
                    </button>
                <ul>
                    <li>
                        <button onClick={() => setSelectedBrand('apple')} className={selectedBrand === 'apple' ? "selected" : ""}>Apple</button>
                    </li>
                    <li>
                        <button onClick={() => setSelectedBrand('samsung')} className={selectedBrand === 'samsung' ? "selected" : ""}>Samsung</button>
                    </li>
                    <li>
                        <button onClick={() => setSelectedBrand('sony')} className={selectedBrand === 'sony' ? "selected" : ""}>Sony</button>
                    </li>
                    <li>
                        <button onClick={() => setSelectedBrand('jbl')} className={selectedBrand === 'jbl' ? "selected" : ""}>JBL</button>
                    </li>
                    <li>
                        <button onClick={() => setSelectedBrand('oraimo')} className={selectedBrand === 'oraimo' ? "selected" : ""}>Oraimo</button>
                    </li>
                    <li>
                        <button onClick={() => setSelectedBrand('xaomi')} className={selectedBrand === 'xaomi' ? "selected" : ""}>Xaomi</button>
                    </li>
                    <li>
                        <button onClick={() => setSelectedBrand('zealot')} className={selectedBrand === 'zealot' ? "selected" : ""}>Zealot</button>
                    </li>
                    <li>
                        <button onClick={() => setSelectedBrand('holo')} className={selectedBrand === 'holo' ? "selected" : ""}>Holo</button>
                    </li>
                </ul>
            </div>
        </>
    )
}
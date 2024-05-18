import React from 'react';
import {BsChevronDoubleLeft } from "react-icons/bs";

export const CheckOut = () => {
    const handleBackButtonClick = () => {
        window.history.back();
    };

    return (
        
        <div>CheckOut
            <button type="button" title="back button" className='backBtn' onClick={handleBackButtonClick}>
                <BsChevronDoubleLeft />
            </button>
        </div>
    )
}

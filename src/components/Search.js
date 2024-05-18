import React from 'react';
import { FaSearch } from "react-icons/fa";


export const Search = () => {
    return (
        <div className="search-box">
        <div className="row">
            <input type="text" id="input-box" placeholder="I'm shopping for..." autoComplete="on" />
            <button type="button" title="button">
            <FaSearch />
            </button>
        </div>
        <div className="result-box">
            {/* <ul>
                <li>JBL</li>
                <li>iwatch</li>
                <li>Series 8</li>
            </ul> */}
        </div>
    </div>
    )
}

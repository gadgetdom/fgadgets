import React from 'react'
import { Link } from 'react-router-dom';
import { FaGooglePlay, FaApple } from "react-icons/fa";


export const Download = () => {
    return (
        <div className="download-container">
            <div className="downloadr">
                <div className="column">
                    <h2>Download FilzGadgets Mobile App</h2>
                    <p>
                        Download our Mobile App to shop on the go, anywhere, everywhere.
                        FilzGadgets in your pocket
                    </p>
                    <div className="store-group">
                        <Link to="#" title="Goto App Store" className="apple">
                                <FaApple />
                            <p>Download from</p>
                            <span>APP Store</span>
                        </Link>
                        <button title="Goto Play Store" className="play"><FaGooglePlay />Download
                            <span>
                                Play Store
                            </span>
                        </button>
                    </div>
                </div>
                <div className="column">
                    <img src="../images/Mobilepage.png" alt="Mobile" />
                </div>
            </div>
        </div>
    )
}

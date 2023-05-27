import React from 'react';
import './Popup.css';

const Popup = ({ image, onClose}) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <img src={image} alt="myPhoto" />
                <button className="close" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Popup;
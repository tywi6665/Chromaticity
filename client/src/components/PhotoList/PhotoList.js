import React from "react";
import "./PhotoList.css";

export const PhotoList = ({ children }) => {
    return (
        <div className="photoList">
            <h3>Image Results</h3>
            {children}
        </div>
    );
};


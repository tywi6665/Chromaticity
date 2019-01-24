import React from "react";
import "./PhotoList.css";

export const PhotoList = ({ children }) => {
    return (
        <pre>
            <code className="photoList">
                <h3>Image Results</h3>
                {children}
            </code>
        </pre>
    );
};


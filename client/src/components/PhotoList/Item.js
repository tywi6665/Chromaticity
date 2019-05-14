import React from "react";

export const Item = props => (
    <div className="images" key={props.id}>
        <img 
            className="image"
            src={props.thumbnail} 
            alt={props.description} />
    </div>
);

import React from "react";
import "./Card.css";
import "../SubmitBtn";

const Card = (props) => (
    <pre>
        <code className="card">
           
                <div className="input">
                    <input className="u-full-width" {...props}/>
                </div>
            
        </code>
    </pre>
);

export default Card;
import React from "react";
import "./Card.css";
import "../SubmitBtn";

const Card = (props) => (
    <pre>
        <code className="card">
           
                <div>
                    <input className="u-full-width input" {...props}/>
                </div>
            
        </code>
    </pre>
);

export default Card;
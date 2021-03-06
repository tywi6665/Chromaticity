import React from "react";
import "./Card.css";
import "../SubmitBtn";

const Card = (props) => (
    <div className="card">
        <label className="label" htmlFor={props.name}>{props.label}</label>
        <input className="input" {...props} />
    </div>
);

export default Card;
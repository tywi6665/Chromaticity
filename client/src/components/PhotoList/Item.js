import React, { Fragment } from "react";

export const Item = props => (
    <Fragment>
        {props.photos.map(photo => (
            <div className="images" key={photo.id}>
                <img src={photo.assets.huge_thumb.url} alt={photo.description} />
            </div> 
        ))}
    </Fragment>
);

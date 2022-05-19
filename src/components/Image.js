import React from "react";

const Image = (props) => {
    const { imgSrc } = props;
    return (
        <div className="image">
            <img src={imgSrc} alt="img" />
        </div>
    );
};

export default Image;

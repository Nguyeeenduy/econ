import router from "next/router";
import React from "react";
import ReactStars from "react-stars";

const Rating = (props) => {
  const { size, start, className, edit, setValueRating } = props;
  const firstExample = {
    size: size,
    value: start,
    edit: edit || false,
  };
  return (
    <div className={`d-flex align-items-center ${className ? className : ""}`}>
      <ReactStars
        {...firstExample}
        onChange={(e) => setValueRating(Math.floor(e))}
      />
      <div>
        <span style={{ marginLeft: "4px", fontSize: "16px" }}>{start}</span>
        <span style={{ fontSize: "12px" }}>/5</span>
      </div>
    </div>
  );
};

export default Rating;

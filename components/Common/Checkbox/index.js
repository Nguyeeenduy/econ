import React from "react";
const CheckBox = ({ className, id, defaultChecked, onChange }) => {
  return (
    <div className={className ? className : ""}>
      <input
        type="checkbox"
        className="checkbox-input"
        id={`checkbox-${id ? id : ""}`}
        defaultChecked={defaultChecked || false}
        onChange={(e) => onChange(e)}
      />
      <label htmlFor={`checkbox-${id ? id : ""}`}>
        <span className="checkbox"></span>
      </label>
    </div>
  );
};
export default CheckBox;

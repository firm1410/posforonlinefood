import React, { Component } from "react";

const Switch = ({ isChecked }) => {
  return (
    <div className="onoffswitch">
      <input
        type="checkbox"
        className="onoffswitch-checkbox"
        id="myonoffswitch"
        onClick={isChecked.bind()}
        defaultChecked
      />
      <label className="onoffswitch-label" htmlFor="myonoffswitch">
        <span className="onoffswitch-inner" />
        <span className="onoffswitch-switch" />
      </label>
    </div>
  );
};
export default Switch;

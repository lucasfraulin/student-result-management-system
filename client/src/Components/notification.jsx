import React, { useState } from "react";

const Notification = ({ message, type, handleClose }) => {
  return (
    (
      <div className={"notification " + type}>
        <p>{message}</p>
        <button onClick={handleClose}>x</button>
      </div>
    )
  );
};

export default Notification;

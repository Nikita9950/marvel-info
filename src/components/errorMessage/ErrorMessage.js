import React from "react";
import img from "./error.gif";
import "./errorMessage.scss";

function ErrorMessage() {
  return (
    <div className="error">
      <img className="error__decoration" src={img} alt="error-message" />;
    </div>
  );
}

export default ErrorMessage;

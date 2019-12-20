import React from "react";
const raiseInvoiceClicked = () => {
  const url = "http://www.cnn.com";
  window.open(url, "_blank");
};

const Rentals = () => {
  return <h1 onClick={() => raiseInvoiceClicked()}>Rentals</h1>;
};

export default Rentals;

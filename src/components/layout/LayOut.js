import React from "react";
import Footer from "./Footer";

const LayOut = ({ children }) => {
  return (
    <>
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default LayOut;

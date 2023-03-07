import React from "react";
import { Link } from "react-router-dom";
import LayOut from "./LayOut";
import HomeImage2 from "../Images/HomeImage2.jpg"

const HomePage = () => {
  return (
    <LayOut>
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${HomeImage2})`,
        }}
      >
        <Link to="/expenseForm">
          <button>Go to Expense Form</button>
        </Link>
      </div>
    </LayOut>
  );
};

export default HomePage;

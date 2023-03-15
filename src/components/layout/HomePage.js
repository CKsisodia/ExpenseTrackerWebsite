import React from "react";
import { Link } from "react-router-dom";
import LayOut from "./LayOut";
import HomeImage1 from "../Images/HomeImage1.jpg";
import { useSelector } from "react-redux";

const HomePage = () => {
  const userData = useSelector((state) => state.user.userProfileData);

  return (
    <LayOut>
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${HomeImage1})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {userData && (
          <Link to="/expenseForm">
            <button
              style={{
                fontSize: 30,
                cursor: "pointer",
                marginTop: 120,
                marginLeft: 40,
                borderRadius: 10,
                borderColor: "#f797aa",
                backgroundColor: "#fac3ce",
                "&:hover": {
                  backgroundColor: "#DC143C",
                },
              }}
            >
              Go to Expense Form
            </button>
          </Link>
        )}
      </div>
    </LayOut>
  );
};

export default HomePage;

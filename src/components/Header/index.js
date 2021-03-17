import React from "react";

const Header = ({ headerTitle = "Songs List", alignment = "center" }) => {
  return (
    <div className={`${alignment === "center" ? "text-center" : "text-left"}`}>
      <h1>{headerTitle}</h1>
    </div>
  );
};

export default Header;

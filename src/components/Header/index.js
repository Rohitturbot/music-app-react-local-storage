import React from "react";

const Header = ({ headerTitle = "Songs List" }) => {
  return (
    <center>
      <h1>{headerTitle}</h1>
    </center>
  );
};

export default Header;

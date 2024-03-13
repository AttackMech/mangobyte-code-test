import React from "react";
import "./PageTitle.css";
import Logo from "../../resources/logo.png";

const PageTitle = ({ title, subtitle }) => {
  return (
    <div className="pageTitle">
      <div className="titleContainer">
        <div className="titleText">{title}</div>
        <div className="subtitleText">{subtitle}</div>
      </div>
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
    </div>
  );
};

export default PageTitle;

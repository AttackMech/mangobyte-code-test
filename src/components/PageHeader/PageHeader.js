import React from "react";
import "./PageHeader.css";
import RatingsSection from "./RatingsSection/RatingsSection.js";
import Moon from "../../resources/moon.svg";

const headerInfo = {
  title: "PDF24",
  subtitle: "Tools",
  button1: "Desktop Version",
  button2: "Contact",
  button4: "All PDF Tools",
};

const PageHeader = () => {
  return (
    <div className="header">
      <div className="titleBar">
        <div>
          <span className="titleText1">{headerInfo.title}</span>
          <span className="titleText2">{headerInfo.subtitle}</span>
        </div>
        {/* TODO: Add functionality for buttons */}
        <div className="buttons">
          <button className="button clearButton">{headerInfo.button1}</button>
          <button className="button clearButton">{headerInfo.button2}</button>
          <button className="button clearButton">
            <img src={Moon} alt="moon" />
          </button>
          <button className="button fillButton">{headerInfo.button4}</button>
        </div>
      </div>
      {/* TODO: Add functionality for ratings section
       * NOTE: The Figma docs indicate open/closed but not content
       */}
      <RatingsSection />
    </div>
  );
};

export default PageHeader;

import React from "react";
import "./ToolBox.css";
import AllTools from "../../../resources/all_tools.svg";
import ArrowRight from "../../../resources/arrow_right.svg";

const toolBoxText = {
  ALL: "See all tools",
};

const ToolBox = () => {
  return (
    <div className="toolBoxContainer">
      <div className="toolBox">
        <div className="toolBoxRow">
          <img src={AllTools} alt="tool row" className="toolRow" />
        </div>
        <div className="allTools">
          {toolBoxText.ALL}
          <img src={ArrowRight} alt="right arrow" />
        </div>
      </div>
    </div>
  );
};

export default ToolBox;

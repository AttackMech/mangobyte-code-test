import React, { useRef } from "react";
import "./FileSelector.css";
import Page from "../../../resources/page.svg";
import ArrowDown from "../../../resources/arrow_down.svg";
import DropBox from "../../../resources/dropbox_logo.png";
import Drive from "../../../resources/google_drive_logo.png";

const selectionText = {
  BUTTON: "Select Files",
  DRAG: "or drag and drop file into this area",
};

const FileSelector = ({ onFileInputChange }) => {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <div className="selectFileContainer">
      <div>
        <img src={Page} alt="page icon" />
      </div>
      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={onFileInputChange}
        ref={hiddenFileInput}
        style={{ display: "none" }}
        id="fileInput"
      />
      <label htmlFor="fileInput">
        <button className="selectFileButton" onClick={handleClick}>
          <span className="selectFileText">{selectionText.BUTTON}</span>
          <img src={ArrowDown} alt="down arrow" />
        </button>
      </label>
      {/* TODO: Add drag & drop functionality */}
      <div className="dragText">{selectionText.DRAG}</div>
      {/* TODO: Add support for online file providers */}
      <div className="fileProviderContainer">
        <img src={DropBox} alt="DropBox logo" className="dropbox" />
        <img src={Drive} alt="Google Drive logo" className="drive" />
      </div>
    </div>
  );
};

export default FileSelector;

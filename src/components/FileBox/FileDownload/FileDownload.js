import React from "react";
import "./FileDownload.css";
import Download from "../../../resources/download.svg";
import DeleteRestart from "../../../resources/delete_restart.svg";

const downloadText = {
  MESSAGE: "Your files are ready",
  DOWNLOAD: "Download",
  PREVIEW: "Preview",
  CONTINUE: "Continue in another tool",
};

const FileDownload = ({ downloadReady, files, onDownloadClick }) => {
  return downloadReady ? (
    <div className="downloadContainer">
      <img src={Download} alt="download" />
      <div className="downloadMessage">{downloadText.MESSAGE}</div>
      <div>
        {files &&
          files.map((file, index) => (
            <div className="downloadNames" key={`file-download-name-${index}`}>
              {file.name}
            </div>
          ))}
      </div>
      <div className="downloadButtonRow">
        <button className="downloadFillButton" onClick={onDownloadClick}>
          {downloadText.DOWNLOAD}
        </button>
        {/* TODO: Add functionality for Preview */}
        <button className="downloadOutlineButton">
          {downloadText.PREVIEW}
        </button>
        {/* TODO: Add functionality for other tools */}
        <button className="downloadFillButton">{downloadText.CONTINUE}</button>
      </div>
      {/* TODO: Add functionality for Delete and Restart buttons */}
      <img
        src={DeleteRestart}
        alt="delete and restart"
        className="deleteRestart"
      />
    </div>
  ) : (
    /* TODO: Handle wait time for compress job
     * Note: The Figma docs were not clear on this
     */
    <h1>Compressing Files ...</h1>
  );
};

export default FileDownload;

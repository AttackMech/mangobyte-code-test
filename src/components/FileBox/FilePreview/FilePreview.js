import React from "react";
import "./FilePreview.css";
import { formatFileSize } from "../../../functions.js";
import Loupe from "../../../resources/loupe.svg";
import Trash from "../../../resources/trash.svg";
import Preview from "../../../resources/preview_image.png";

const FileInfoBox = ({ name, size }) => {
  return (
    <div className="fileInfoContainer">
      <div className="fileIcons">
        {/* TODO: Add support for loupe and delete buttons */}
        <img src={Loupe} alt="loupe" />
        <img src={Trash} alt="trash" />
      </div>
      {/* TODO: Add real preview images */}
      <div className="previewImage">
        <img src={Preview} alt="preview" />
      </div>
      <div className="previewNameContainer">
        <span className="previewFileName">{name}</span>
        <span className="previewFileSize">{formatFileSize(size)}</span>
      </div>
    </div>
  );
};

const FilePreview = ({ files }) => {
  return files.length > 0 ? (
    <div className="filePreviews">
      {files &&
        files.map((file, index) => (
          <FileInfoBox key={`file-info-box-${index}`} {...file} />
        ))}
    </div>
  ) : (
    /* TODO: Handle upload file wait period
     * NOTE: The Figma docs were not clear on what to do here.
     */
    <h1>Uploading Files ...</h1>
  );
};

export default FilePreview;

import React from "react";
import "./CompressionSettings.css";

const settingsText = {
  TITLE: "Compression Settings",
  LABEL_1: "DPI",
  LABEL_2: "Image Quality",
  LABEL_3: "Color",
  LABEL_4: "Gray",
};

// TODO: Get real values for settings
const settingsValues = {
  DPI_MIN: 50,
  DPI_MAX: 300,
  QUALITY_MIN: 1,
  QUALITY_MAX: 100,
};

const CompressionSettings = ({
  dpi,
  onDPIChange,
  quality,
  onQualityChange,
  isGray,
  onColorChange,
}) => {
  return (
    <div className="compressionSettingsContainer">
      <div className="compressSettingsTitle">{settingsText.TITLE}</div>
      <div className="compressInputContainer">
        <label htmlFor="dpi" className="compressSettingsLabel">
          {settingsText.LABEL_1}
        </label>
        <input
          className="compressSettingsNumber"
          type="number"
          id="dpi"
          name="dpi"
          value={dpi}
          onChange={onDPIChange}
          min={settingsValues.DPI_MIN}
          max={settingsValues.DPI_MAX}
        />
        <label htmlFor="quality" className="compressSettingsLabel">
          {settingsText.LABEL_2}
        </label>
        <input
          className="compressSettingsNumber"
          type="number"
          id="quality"
          name="quality"
          value={quality}
          onChange={onQualityChange}
          min={settingsValues.QUALITY_MIN}
          max={settingsValues.QUALITY_MAX}
        />
        <div className="compressSettingsLabel">{settingsText.LABEL_3}</div>
        <div>
          <label className="toggleSwitch">
            <input type="checkbox" checked={isGray} onChange={onColorChange} />
            <span className="toggleSlider toggleRound"></span>
          </label>
        </div>
        <div className="compressSettingsLabel">{settingsText.LABEL_4}</div>
      </div>
    </div>
  );
};

export default CompressionSettings;
export { settingsValues };

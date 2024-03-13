import React, { useState } from "react";
import "./Compression.css";
import CompressionSettings, {
  settingsValues,
} from "./CompressionSettings/CompressionSettings.js";
import {
  findClosestPercentage,
  findNumberForPercentage,
} from "../../../functions.js";

const compressText = {
  LEVEL: "Level of compression",
  SLIDER_LEFT_1: "Small Size",
  SLIDER_LEFT_2: "Low Quality",
  SLIDER_RIGHT_1: "Big Size",
  SLIDER_RIGHT_2: "High Quality",
  BUTTON: "Compress",
};

const sliderValues = {
  MIN: 0,
  MAX: 100,
  STEP: 25,
};

const Compression = ({
  dpi,
  onDPIChange,
  quality,
  onQualityChange,
  isGray,
  onColorChange,
  onCompressClick,
}) => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    const newDPI = findNumberForPercentage(
      newValue,
      settingsValues.DPI_MAX,
      settingsValues.DPI_MIN
    );
    const newQuality = findNumberForPercentage(
      newValue,
      settingsValues.QUALITY_MAX,
      settingsValues.QUALITY_MIN
    );

    setSliderValue(newValue);
    onDPIChange({ target: { value: newDPI } });
    onQualityChange({ target: { value: newQuality } });
  };

  const onDPIChangeSlider = (event) => {
    const newValue = event.target.value;
    const dpiPercent = findClosestPercentage(
      newValue,
      settingsValues.DPI_MAX,
      settingsValues.DPI_MIN
    );
    const qualityPercent = findClosestPercentage(
      quality,
      settingsValues.QUALITY_MAX,
      settingsValues.QUALITY_MIN
    );
    const sliderPercentage = findClosestPercentage(
      (dpiPercent + qualityPercent) / 2,
      sliderValues.MAX,
      sliderValues.MIN,
      sliderValues.STEP
    );
    setSliderValue(sliderPercentage);
    onDPIChange({ target: { value: newValue } });
  };

  const onQualityChangeSlider = (event) => {
    const newValue = event.target.value;
    const dpiPercent = findClosestPercentage(
      dpi,
      settingsValues.DPI_MAX,
      settingsValues.DPI_MIN
    );
    const qualityPercent = findClosestPercentage(
      newValue,
      settingsValues.QUALITY_MAX,
      settingsValues.QUALITY_MIN
    );
    const sliderPercentage = findClosestPercentage(
      (dpiPercent + qualityPercent) / 2,
      sliderValues.MAX,
      sliderValues.MIN,
      sliderValues.STEP
    );

    setSliderValue(sliderPercentage);
    onQualityChange({ target: { value: newValue } });
  };

  return (
    <div className="compressContainer">
      <div className="compressBorder"></div>
      <div className="compressSettingContainer">
        <div className="levelText">{compressText.LEVEL}</div>
        <div className="sliderContainer">
          <div className="sliderText">
            <div>{compressText.SLIDER_LEFT_1}</div>
            <div>{compressText.SLIDER_LEFT_2}</div>
          </div>
          <div className="slider">
            <input
              type="range"
              min={sliderValues.MIN}
              max={sliderValues.MAX}
              value={sliderValue}
              step={sliderValues.STEP}
              onChange={handleSliderChange}
              className="sliderInput"
              id="mySlider"
            />
          </div>
          <div className="sliderText">
            <div>{compressText.SLIDER_RIGHT_1}</div>
            <div>{compressText.SLIDER_RIGHT_2}</div>
          </div>
        </div>
        <CompressionSettings
          dpi={dpi}
          onDPIChange={onDPIChangeSlider}
          quality={quality}
          onQualityChange={onQualityChangeSlider}
          isGray={isGray}
          onColorChange={onColorChange}
        />
        <button className="compressButton" onClick={onCompressClick}>
          {compressText.BUTTON}
        </button>
      </div>
    </div>
  );
};

export default Compression;

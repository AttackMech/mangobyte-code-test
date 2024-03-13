import React, { useState } from "react";
import "./FileBox.css";
import FileSelector from "./FileSelector/FileSelector.js";
import FilePreview from "./FilePreview/FilePreview";
import Compression from "./Compression/Compression.js";
import FileDownload from "./FileDownload/FileDownload.js";
import ToolBox from "./ToolBox/ToolBox";
import { ApiEndpoints } from "../../api/endpoints.js";
import { sendDataToApi, fetchDataFromApi } from "../../api/api.js";
import Check from "../../resources/check.svg";

const stages = {
  STAGE_1: "1. Upload Your PDFs",
  STAGE_2: "2. Choose Compression",
  STAGE_3: "3. Done",
};

const POLL_INTERVAL = 1000;
const FILENAME = "compressPDF";

const FileBox = () => {
  const [storedFiles, setStoredFiles] = useState([]);
  const [jobData, setJobData] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [pollTimeoutId, setPollTimeoutId] = useState(0);
  const [currentStage, setCurrentStage] = useState(stages.STAGE_1);
  const [dpi, setDPI] = useState(50);
  const [quality, setQuality] = useState(1);
  const [isGray, setIsGray] = useState(false);

  const onDPIChange = (event) => {
    const newValue = event.target.value;
    setDPI(newValue);
  };

  const onQualityChange = (event) => {
    const newValue = event.target.value;
    setQuality(newValue);
  };

  const onColorChange = (event) => {
    const newValue = event.target.value;
    setIsGray(newValue);
  };

  const handleFileInputChange = async (event) => {
    const selectedFiles = event.target.files;

    if (Object.keys(selectedFiles).length > 0) {
      const formData = new FormData();

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        formData.append("files[]", file);
      }

      setCurrentStage(stages.STAGE_2);

      try {
        const response = await sendDataToApi(ApiEndpoints.POST_FILE, formData);
        setStoredFiles(response);
      } catch (error) {
        console.error("Error uploading files:", error);
        // TODO: Handle file upload error
      }
    }
  };

  const onCompressClick = async (event) => {
    const payload = {
      files: storedFiles,
      dpi: 144,
      imageQuality: 75,
      mode: "normal",
      colorModel: "",
    };
    /* TODO: use values for dpi, quality, and color from component
     * NOTE: I wasn't sure what the min/max limits and accepted values were
     * for the API, but these can easily be added in.
     */

    setCurrentStage(stages.STAGE_3);

    try {
      const response = await sendDataToApi(
        ApiEndpoints.POST_COMPRESS,
        payload,
        true
      );

      setJobId(response.jobId);
      pollJobStatus(response.jobId);
    } catch (error) {
      console.error("Error starting compression:", error);
      // TODO: Handle job start error
    }
  };

  const pollJobStatus = async (pollJobId) => {
    const endpoint = ApiEndpoints.GET_STATUS + pollJobId;

    try {
      const response = await fetchDataFromApi(endpoint, true);
      setJobData(response);
      const status = response.status;

      if (status === "done") {
        clearTimeout(pollTimeoutId);
        return;
      }

      const timeoutId = setTimeout(
        () => pollJobStatus(pollJobId),
        POLL_INTERVAL
      );
      setPollTimeoutId(timeoutId);
    } catch (error) {
      console.error("Error polling job data:", error);
      // TODO: Handle polling error
    }
  };

  const onDownloadClick = async () => {
    const endpoint = ApiEndpoints.GET_FILE + jobId;

    try {
      const response = await fetchDataFromApi(endpoint);

      response.blob().then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");

        const filename =
          storedFiles.length > 1
            ? FILENAME + ".zip"
            : FILENAME + "_" + storedFiles[0].name;

        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
      });
    } catch (error) {
      console.error("Error downloading the file:", error);
      // TODO: Handle download error
    }
  };

  return (
    <>
      <div
        className={`toolContainer ${
          storedFiles.length > 0 ? "solidBorder" : "dashedBorder"
        }`}
      >
        <div className="stageContainer">
          <div className="stage stageReady">
            {storedFiles.length > 0 && <img src={Check} alt="check" />}
            {stages.STAGE_1}
          </div>
          <div
            className={`stage ${
              currentStage === stages.STAGE_1 ? "stageNotReady" : "stageReady"
            }`}
          >
            {currentStage === stages.STAGE_3 && <img src={Check} alt="check" />}
            {stages.STAGE_2}
          </div>
          <div
            className={`stage ${
              currentStage === stages.STAGE_3 && jobData?.status === "done"
                ? "stageReady"
                : "stageNotReady"
            }`}
          >
            {stages.STAGE_3}
          </div>
        </div>
        {currentStage === stages.STAGE_1 && (
          <FileSelector onFileInputChange={handleFileInputChange} />
        )}
        {currentStage === stages.STAGE_2 && <FilePreview files={storedFiles} />}
        {currentStage === stages.STAGE_3 && (
          <FileDownload
            downloadReady={jobData?.status === "done"}
            files={storedFiles}
            onDownloadClick={onDownloadClick}
          />
        )}
      </div>
      {currentStage === stages.STAGE_2 && storedFiles.length > 0 && (
        <Compression
          dpi={dpi}
          onDPIChange={onDPIChange}
          quality={quality}
          onQualityChange={onQualityChange}
          isGray={isGray}
          onColorChange={onColorChange}
          onCompressClick={onCompressClick}
        />
      )}
      {/* TODO: Add functionality for other tools */}
      <ToolBox />
    </>
  );
};

export default FileBox;

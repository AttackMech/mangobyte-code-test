const BASE_URL = "https://filetools13.pdf24.org/client.php";

const ApiEndpoints = {
  GET_STATUS: "?action=getStatus&jobId=",
  GET_FILE: "?mode=download&action=downloadJobResult&jobId=",

  POST_FILE: "?action=upload",
  POST_COMPRESS: "?action=compressPdf",
};

export { BASE_URL, ApiEndpoints };

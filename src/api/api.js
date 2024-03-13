import { BASE_URL } from "./endpoints.js";

export const fetchDataFromApi = async (endpoint, json = false) => {
  const getObject = {
    method: "GET",
    credentials: "include",
  };

  if (json) {
    getObject.headers = {
      "Content-Type": "application/json; charset=UTF-8",
    };
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, getObject);

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    if (json) {
      const jsonData = await response.json();
      console.log(jsonData);
      return jsonData;
    }

    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const sendDataToApi = async (endpoint, data, json = false) => {
  const postObject = {
    method: "POST",
    credentials: "include",
    body: data,
  };

  if (json) {
    postObject.headers = {
      "Content-Type": "application/json; charset=UTF-8",
    };
    postObject.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, postObject);

    if (!response.ok) {
      throw new Error("Error sending data");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};

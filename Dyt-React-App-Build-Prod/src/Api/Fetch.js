import { attemptRequest } from "redux-requests";
import { PENDING, SUCCESS, ERROR } from "../Constant/Status";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = response;
  //  error.error = response;
  throw error;
};

const parseContent = (response, headers) => {
  let json;

  if (headers["Content-Type"] === "blob") {
    return response.blob();
  }

  if (headers["Content-Type"] === "text/plain") {
    return response.text();
  }

  try {
    json = response.json();
  } catch (e) {
    throw new Error(e);
  }
  return json;
};

const createAction = (type, url, options) => {
  const { requestId, payload, ...rest } = options;

  const request = new Promise((resolve, reject) => {
    fetch(url, rest)
      .then(checkStatus)
      .then((response) => parseContent(response, rest.headers))
      .then((res) => {
        resolve(res);
        return res;
      })
      .catch((error) => {
        // parseContent(error, rest.headers)
        reject(error);
      });
  });

  const makeRequest = () => request;

  return (dispatch) => {
    attemptRequest(
      requestId || url,
      {
        begin: () => ({
          type: `${type}_${PENDING}`,
          payload,
        }),
        success: (response) => ({
          type: `${type}_${SUCCESS}`,
          response,
          payload,
        }),
        failure: (error) => {
          return {
            type: `${type}_${ERROR}`,
            error,
            payload,
          };
        },
      },
      makeRequest,
      dispatch
    );
    return request;
  };
};

export default createAction;
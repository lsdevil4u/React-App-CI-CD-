const getToken = () => {
  return `Bearer ${localStorage?.user_token}`;
};
const httpConfig = {
  mode: "cors", // no-cors, cors, *same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    'Authorization': getToken(),
    // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwMzA4NzA0LCJqdGkiOiIzOGM0MDhhNzgwZTA0OTE0OWVlM2M3ODE1ODlkNjQwNyIsInVzZXJfaWQiOjgyMH0.CyzuGf1N_JqIonLlNL0B9C7lSlk1t5V7hpwWWv-Y0gg',
  },
};

const httpNoAuthConfig = {
  mode: "cors", // no-cors, cors, *same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
};

const httpDownloadFileConfig = {
  mode: "cors", // no-cors, cors, *same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  headers: {
    "Content-Type": "blob",
    'Authorization': getToken(),
  },
};


const http = {
  get: (headers = {}) => ({
    method: "GET",
    ...httpConfig,
    headers: {
      ...httpConfig.headers,
      ...headers,
    },
  }),
  getNoAuth: (headers = {}) => ({
    method: "GET",
    ...httpNoAuthConfig,
    headers:
    {
      "Content-Type": "application/json;",
    }
    ,
  }),
  post: (payload) => ({
    method: "POST",
    ...httpConfig,
    body: JSON.stringify(payload),
  }),
  patch: (payload) => ({
    method: "PATCH",
    ...httpConfig,
    body: JSON.stringify(payload),
  }),
  postForm: (formData) => {
    return getConfigForForm(formData, "POST");
  },
  patchForm: (formData) => {
    return getConfigForForm(formData, "PATCH");
  },
  put: (payload) => ({
    method: "PUT",
    ...httpConfig,
    body: JSON.stringify(payload),
  }),
  delete: () => ({
    method: "DELETE",
    ...httpConfig,
  }),
  postNoAuth: (payload) => ({
    method: "POST",
    ...httpNoAuthConfig,
    body: JSON.stringify(payload),
  }),
  patchNoAuth: (payload) => ({
    method: "PATCH",
    ...httpNoAuthConfig,
    body: JSON.stringify(payload),
  }),
  getDownloadFiles: (headers = {}) => ({
    method: "GET",
    ...httpDownloadFileConfig,
    headers: {
      ...httpDownloadFileConfig.headers,
      ...headers,
    },
  }),

};

function getConfigForForm(formData, method) {
  const config = {
    method: method,
    ...httpConfig,
    headers: { ...httpConfig.headers },
    body: formData,
  };
  delete config.headers["Content-Type"];
  return config;
}

export default http;
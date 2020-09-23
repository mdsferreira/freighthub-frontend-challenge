export const getURL = (baseUrl, params) => {
  const searchParamsKeys = Object.keys(params);
  let url = "";
  searchParamsKeys.map((param, index) => {
    url +=
      index === searchParamsKeys.length - 1
        ? `${param}=${params[param]}`
        : `${param}=${params[param]}&`;
    return null;
  });
  return `${baseUrl}?${url}`;
};

const API_URI = process.env.REACT_APP_BACKEND_URL;

export const urls = {
  shipment: `${API_URI}/shipments`,
};

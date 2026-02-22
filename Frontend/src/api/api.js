// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

// // load dashboard data like weather, last diagnosis, alerts etc
// export const getDashboardData = async () => {
//   const res = await axios.get(`${API_BASE}/dashboard`);
//   return res.data;
// };

// // get user's diagnosis history
// export const getHistory = async () => {
//   const res = await axios.get(`${API_BASE}/history`);
//   return res.data;
// };

// // send image file to backend for diagnosis
// export const diagnose = async (file) => {
//   const formData = new FormData();

//   formData.append("image", file);
//   formData.append("userId", "u1");

//   const response = await axios.post(
//     `${API_BASE}/diagnosis`,
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       }
//     }
//   );

//   return response.data;
// };

// // user login
// export const login = async (phone) => {
//   const res = await axios.post(
//     `${API_BASE}/user/login`,
//     { phone },
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     },
//   );
//   return res.data;
// };

// // user signup
// export const register = async (username, phone) => {
//   const res = await axios.post(
//     `${API_BASE}/user/register`,
//     {
//       username,
//       phone,
//     },
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     },
//   );
//   return res.data;
// };

// export const setLocation = async (lat, lng) => {
//   const res = await axios.post(
//     `${API_BASE}/user/set-location`,
//     { lat, lng },
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     },
//   );
//   return res.data;
// };

// export const setLang = async (language) => {
//   const res = await axios.post(
//     `${API_BASE}/user/set-language`,
//     { language },
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     },
//   );
//   return res.data;
// };

// // get nearby markets within radius (in km) of user's location
// export const getNearByMarkets = async (radius) => {
//   const res = await axios.get(`${API_BASE}/resources/markets/${radius}`);
//   return res.data;
// };

// export const getLocation = async () => {
//   const res = await axios.get(`${API_BASE}/user/location`);
//   return res.data;
// }

import axios from "axios";

const API_BASE = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});
export const diagnose = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await api.post("/diagnosis", formData);
  return res.data;
};

export const login = async (phone) => {
  const res = await api.post("/user/login", { phone });
  return res.data;
};

export const register = async (username, phone) => {
  const res = await api.post("/user/register", { username, phone });
  return res.data;
};

export const setLocation = async (lat, lng) => {
  const res = await api.post("/user/set-location", { lat, lng });
  return res.data;
};

export const setLang = async (language) => {
  const res = await api.post("/user/set-language", { language });
  return res.data;
};

export const getHistory = async () => {
  const res = await api.get("/history");
  return res.data;
};

export const getNearByMarkets = async (radius) => {
  const res = await api.get(`/resources/markets/${radius}`);
  return res.data;
};

// reverse geocode latitude & longitude to a display name
export const getLocation = async (lat, lng) => {
  const res = await api.post("/user/location", { lat, lng });
  return res.data;
};

// backend exposes weather on /dashboard/weather
export const getWeather = async (lat, lng) => {
  const res = await api.post("/dashboard/weather", { lat, lng });
  return res.data;
};

export const getTranslations = async () => {
  const res = await api.get("/translate");
  return res.data;
};

import axios from "axios";
const URL = "https://warm-druid-0f246f.netlify.app";

export const login = async ({ email, password }) => {
  try {
    const res = await axios.post(`${URL}/users/login`, {
      email,
      password,
    });

    console.log(res);
    return res;
  } catch (error) {
    throw error;
  }
};

export const register = async ({ email, password, name, contact }) => {
  try {
    const res = await axios.post(`${URL}/users`, {
      email,
      name,
      password,
      contact,
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export const getuser = async (id) => {
  try {
    const res = await axios.get(`${URL}/users/${id}`);
    console.log(res);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getUserByUsername = async (username) => {
  try {
    const res = await axios.get(`${URL}/username/${username}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const editProfile = async (id, data) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  try {
    const res = await axios.patch(`${URL}/users/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (err) {
    throw err;
  }
};

import axios from "axios";
import config from "../config/config";

const list = async () => {
  try {
    const result = await axios.get(`${config}/regions`);
    return result.data;
  } catch (error) {
    return await error.message;
  }
};

const getById = async (id) => {
  try {
    const result = await axios.get(`${config}/regions/${id}`);
    return result.data;
  } catch (error) {
    return await error.message;
  }
};

const deleted = async (id) => {
  try {
    const result = await axios.delete(`${config}/regions/${id}`);
    return result;
  } catch (error) {
    return await error.message;
  }
};

const create = async (payload) => {
  try {
    const result = await axios.post(`${config}/regions`, payload);
    return result;
  } catch (error) {
    return await error.message;
  }
};

const update = async (id, payload) => {
  try {
    console.log(payload.get("name"));
    const result = await axios.put(`${config}/regions/${id}`, payload);
    return result;
  } catch (error) {
    return await error.message;
  }
};

const upload = async (payload) => {
  try {
    const result = await axios.post(`${config}/regions/upload`, payload);
    return result;
  } catch (error) {
    return await error.message;
  }
};

const functionAll = {
  list,
  deleted,
  create,
  update,
  getById,
  upload,
};

export default functionAll;

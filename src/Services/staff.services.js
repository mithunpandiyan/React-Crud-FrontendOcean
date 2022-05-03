import http from "./index";

const addStaff = async (body) => {
  return http.post("/createStaff", body);
};

const getStaffs = async () => {
  return http.get("/getAllStaffs");
};

const editStaff = async (id, body) => {
  return http.put(`/updateStaff/${id}`, body);
};

const deleteStaff = async (id) => {
  return http.delete(`/deleteStaff/${id}`);
};

export default {
    addStaff,
    getStaffs,
    editStaff,
    deleteStaff
};
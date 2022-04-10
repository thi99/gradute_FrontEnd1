import instance from "./intance";

export const getAllCategoryFood = () => {
  const url = "/categoryfoods";
  return instance.get(url);
};

export const getOneCategory = (id) => {
  const url = `/categoryfoods/${id}`;
  return instance.get(url);
};

export const AddCategoryFood = (data) => {
  const url = "/categoryfoods/create";
  return instance.post(url,data);
};

export const removeCate = (id) => {
  const url = `/categoryfoods/${id}`;
  return instance.delete(url);
};

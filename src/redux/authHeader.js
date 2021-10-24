import deviceStorage from "./deviceStorage .js";

export const authHeader = async () => {
  const token = await deviceStorage.loadJWT();
  return { Authorization: `Bearer ${token}` };
};

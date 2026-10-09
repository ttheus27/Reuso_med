import axios from "axios";

const SPEDY_API_KEY = process.env.SPEDY_API_KEY;
const BASE_URL = "https://api.spedy.com.br/v1";

const headers = {
  "X-Api-Key": SPEDY_API_KEY,
  "Content-Type": "application/json",
};

export async function getSpedyCustomer(id) {
  try {
    const res = await axios.get(`${BASE_URL}/customers/${id}`, { headers });
    return res.data;
  } catch {
    return null;
  }
}

export async function createSpedyCustomer(data) {
  try {
    const res = await axios.post(`${BASE_URL}/customers`, data, { headers });
    return res.data;
  } catch (err) {
    console.error(
      "Erro ao criar cliente Spedy:",
      err instanceof Error ? err.message : "Erro desconhecido"
    );
    throw err;
  }
}

export async function createSpedyOrder(data) {
  const res = await axios.post(`${BASE_URL}/orders`, data, { headers });
  return res.data;
}

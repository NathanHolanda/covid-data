// configuração para as requisições feitas em Axios
import axios from "axios";

const api = axios.create({
  // URL padrão da API utilizada
  baseURL: "https://covid19-brazil-api.now.sh/api/report/v1",
});

export default api;

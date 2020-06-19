import axios from "axios";

let api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export { api, axios };

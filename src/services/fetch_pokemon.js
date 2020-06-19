import { axios, api } from "./axios";

const fetchPokemon = {
  fetchPokemonInfo,
  fetchPokemonType,
};

function fetchPokemonInfo(name, source) {
  return new Promise((resolve, reject) => {
    api
      .get(`pokemon-species/${name}`, {
        cancelToken: source.token,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function fetchPokemonType(name, source) {
  return new Promise((resolve, reject) => {
    api
      .get(`pokemon/${name}`, {
        cancelToken: source.token,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export { axios, fetchPokemon };

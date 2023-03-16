import axios from "axios";
import "@/helpers";
const Axios = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

const GetRandomPokemon = () => {
  const offset = [...Array(60).keys()].random();
  return Axios({
    url: `/pokemon?offset=${offset}`,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const GetPokemonDetail = (url) => {
  return Axios({
    url: url,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const GetAllPokemon = (offset) => {
  return Axios({
    url: `/pokemon?offset=${offset}&limit=30`,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const DataActions = {
  GetRandomPokemon,
  GetPokemonDetail,
  GetAllPokemon,
};

export default DataActions;

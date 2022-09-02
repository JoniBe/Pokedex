import http from "/src/core/http/main";

export const getPokemonEntries = async () => {
  const { data } = await http.get("/pokedex/1");
  return data;
};

export const getPokemonById = async (id: number) => {
  const { data } = await http.get(`/pokemon/${id}`);
  return data;
};

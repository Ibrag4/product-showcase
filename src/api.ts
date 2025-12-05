export async function getPokemons() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
  const data = await res.json();
  return data.results;
}

export async function getPokemonDetails(url) {
  const res = await fetch(url);
  return await res.json();
}

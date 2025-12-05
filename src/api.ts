export async function getPokemons(): Promise<any[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
  const data = await res.json();

  return data.results.map((p: any, index: number) => ({
    ...p,
    id: index + 1
  }));
}

export async function getPokemonDetails(url: string): Promise<any> {
  const res = await fetch(url);
  return await res.json();
}

// src/api.ts
export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  name: string;
  sprites: { front_default: string; other?: any };
  height: number;
  weight: number;
  types?: { slot: number; type: { name: string } }[];
}

export async function getPokemons(limit = 50): Promise<Pokemon[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  if (!res.ok) throw new Error("Erro ao buscar pokemons");
  const data = await res.json();
  return data.results as Pokemon[];
}

// retorna detalhes completos
export async function getPokemonDetails(url: string): Promise<PokemonDetails> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar detalhes");
  return (await res.json()) as PokemonDetails;
}

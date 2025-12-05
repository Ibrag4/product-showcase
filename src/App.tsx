import { useEffect, useState } from "react";
import "./App.css";
import { getPokemons, getPokemonDetails } from "./api";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  name: string;
  sprites: { front_default: string };
  height: number;
  weight: number;
}

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selected, setSelected] = useState<PokemonDetails | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getPokemons().then(setPokemons);
  }, []);

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  function openDetails(pokemon: Pokemon) {
    getPokemonDetails(pokemon.url).then(setSelected);
  }

  // Função pra extrair o ID da URL da PokeAPI
  function getPokemonId(url: string) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
  }

  return (
    <div className="app-container">
      <h1 className="title">Pokedex</h1>

      <input
        type="text"
        placeholder="Buscar Pokémon..."
        className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid">
        {filtered.map((p) => {
          const id = getPokemonId(p.url);

          return (
            <div key={p.name} className="card" onClick={() => openDetails(p)}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt={p.name}
                className="card-img"
              />
              <span>{p.name}</span>
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="modal-bg" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="uppercase">{selected.name}</h2>

            <img
              src={selected.sprites.front_default}
              alt={selected.name}
              width="120"
            />

            <p>Altura: {selected.height}</p>
            <p>Peso: {selected.weight}</p>

            <button className="close-btn" onClick={() => setSelected(null)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

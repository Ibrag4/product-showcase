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

  useEffect(() => {
    getPokemons().then(setPokemons);
  }, []);

  function openDetails(pokemon: Pokemon) {
    getPokemonDetails(pokemon.url).then(setSelected);
  }

  return (
    <div className="app-container">
      <h1 className="title">Pokedex</h1>

      <div className="grid">
        {pokemons.map((p) => (
          <div key={p.name} className="card" onClick={() => openDetails(p)}>
            {p.name}
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-bg" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="uppercase">{selected.name}</h2>
            <img
              src={selected.sprites.front_default}
              alt={selected.name}
              width="100"
            />
            <p>Altura: {selected.height}</p>
            <p>Peso: {selected.weight}</p>

            <button onClick={() => setSelected(null)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

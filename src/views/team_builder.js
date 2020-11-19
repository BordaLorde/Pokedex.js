import React, { useState, useEffect } from "react";
import PokemonSelect from "../components/pokemon_select";
import Entry from "../components/entry";

const TeamBuilder = () => {
  const [pokemon, setPokemon] = useState([]);
  const [selected_pokemon, setSelectedPokemon] = useState({
    pokemon1: "",
    pokemon2: "",
    pokemon3: "",
    pokemon4: "",
    pokemon5: "",
    pokemon6: "",
  });

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon-species?limit=893")
      .then((res) => res.json())
      .then(
        (result) => {
          setPokemon(result.results);
        },
        (error) => {
          setPokemon([]);
        }
      );
  }, []);

  return (
    <div className="ui six column grid container">
      <div className="column">
        <PokemonSelect
          pokemon={pokemon}
          selected_pokemon={selected_pokemon.pokemon1}
          onChange={(new_value) => {
            setSelectedPokemon({ ...selected_pokemon, pokemon1: new_value });
          }}
        />
      </div>
      <div className="column">
        <PokemonSelect
          pokemon={pokemon}
          selected_pokemon={selected_pokemon.pokemon2}
          onChange={(new_value) => {
            setSelectedPokemon({ ...selected_pokemon, pokemon2: new_value });
          }}
        />
      </div>
      <div className="column">
        <PokemonSelect
          pokemon={pokemon}
          selected_pokemon={selected_pokemon.pokemon3}
          onChange={(new_value) => {
            setSelectedPokemon({ ...selected_pokemon, pokemon3: new_value });
          }}
        />
      </div>
      <div className="column">
        <PokemonSelect
          pokemon={pokemon}
          selected_pokemon={selected_pokemon.pokemon4}
          onChange={(new_value) => {
            setSelectedPokemon({ ...selected_pokemon, pokemon4: new_value });
          }}
        />
      </div>
      <div className="column">
        <PokemonSelect
          pokemon={pokemon}
          selected_pokemon={selected_pokemon.pokemon5}
          onChange={(new_value) => {
            setSelectedPokemon({ ...selected_pokemon, pokemon5: new_value });
          }}
        />
      </div>
      <div className="column">
        <PokemonSelect
          pokemon={pokemon}
          selected_pokemon={selected_pokemon.pokemon6}
          onChange={(new_value) => {
            setSelectedPokemon({ ...selected_pokemon, pokemon6: new_value });
          }}
        />
      </div>
      {selected_pokemon.pokemon1 && (
        <div className="column">
          <Entry name={selected_pokemon.pokemon1} />
        </div>
      )}
      {selected_pokemon.pokemon2 && (
        <div className="column">
          <Entry name={selected_pokemon.pokemon2} />
        </div>
      )}
      {selected_pokemon.pokemon3 && (
        <div className="column">
          <Entry name={selected_pokemon.pokemon3} />
        </div>
      )}
      {selected_pokemon.pokemon4 && (
        <div className="column">
          <Entry name={selected_pokemon.pokemon4} />
        </div>
      )}
      {selected_pokemon.pokemon5 && (
        <div className="column">
          <Entry name={selected_pokemon.pokemon5} />
        </div>
      )}
      {selected_pokemon.pokemon6 && (
        <div className="column">
          <Entry name={selected_pokemon.pokemon6} />
        </div>
      )}
    </div>
  );
};

export default TeamBuilder;

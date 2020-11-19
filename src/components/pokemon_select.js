import React from "react";

const PokemonSelect = ({ pokemon, selected_pokemon, onChange }) => {
  return (
    <div>
      <select
        value={selected_pokemon}
        onChange={(e) => onChange(e.currentTarget.value)}
      >
        <option disabled value="">
          select a pokemon
        </option>
        {pokemon.map(({ name }) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PokemonSelect;

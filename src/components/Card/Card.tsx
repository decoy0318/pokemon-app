import React from 'react'
import './Card.css'

const Card: React.FC<{ pokemon: Pokemon }> = ({pokemon}) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cardTypes">
        <div>タイプ</div>
        {pokemon.types.map((type) => {
          return <div key={type.type.name}>
            <span className="typeName">{type.type.name}</span>
          </div>
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="title">重さ: {pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p className="title">高さ: {pokemon.height}</p>
        </div>
        {pokemon.abilities.map((ability, index) => (
          <div className="cardData" key={index}>
            <p className="title">アビリティ{index + 1}: {ability.ability.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;

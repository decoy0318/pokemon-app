import React, { useState, useEffect } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [nextURL, setNextURL] = useState<string | null>("");
  const [prevURL, setPrevURL] = useState<string | null>("");

  const increment = () => setCount((nextCount) => nextCount + 1);
  const decrement = () => setCount((prevCount) => {
    if (prevCount <= 0) return prevCount;
    return prevCount - 1;
  });

  useEffect(() => {
    const fetchPokemonData = async () => {
      const res = await getAllPokemon(initialURL);
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data: Pokemon[]) => {
    const _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        const pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const handleNextPage = async () => {
    if (!nextURL) return;

    setLoading(true);
    const data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handlePrevPage = async () => {
    if (!prevURL) return;

    setLoading(true);
    const data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  return (
    <>
      <div className="App">
        {loading ? (
          <h1>ロード中</h1>
        ) : (
          <>
            <Navbar />
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => (
                <Card key={i} pokemon={pokemon} />
              ))}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
            <div>
              <h3>手動カウンター: {count}</h3>
              <button onClick={decrement}>減らす</button>
              <button onClick={increment}>増やす</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;

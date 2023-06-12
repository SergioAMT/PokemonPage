import React, { useState } from 'react'
import { useGlobalContext } from '../content/global';
import Image from 'next/image';
import Router from 'next/router';

export default function Home() {
  const { allPokemonData, searchResults, getPokemon, loading, realTimeSearch } = useGlobalContext();
  const [search, setsearch] = useState("");

  const handleChange = (e) => {
    setsearch(e.target.value);
  }

  return <main>
    <form action="" className='search-form'>
      <div className='input-control'>
        <input
          type='text'
          value={search}
          onChange={handleChange}
          placeholder='Search for a Pokemon...' />
        <button className='submit-btn' type='submit'>
          Search
        </button>
      </div>
    </form>

    {search && <div className='search-results'>

    </div>}

    <div className='all-pokemon'>
      {allPokemonData ? allPokemonData.map((pokemon) => {
        return <div key={pokemon.id} className='card' onClick={() => {
          Router.push(`/pokemon/${pokemon.name}`)
        }}>
          <div className='card-image'>
            <Image className='image' src={pokemon.sprites.other.home.front_shiny} alt={pokemon.name} width={250} height={250} />
          </div>
          <div className='card-body'>
            <h3>{pokemon.name}</h3>
            <p>More Details: &nbsp; &rarr;</p>
          </div>
        </div>
      }) : <h1>loading...</h1>}
    </div>
  </main>

}

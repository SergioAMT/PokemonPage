import React, { useContext, useEffect, useReducer } from "react"
import { useState } from "react";

const GlobalContext = React.createContext({});

//ACTION 
const LOADING = "LOADING";
const GET_POKEMON = "GET_POKEMON";
const GET_ALL_POKEMON = "GET_ALL_POKEMON";
const GET_ALL_POKEMON_DATA = "GET_ALL_POKEMON_DATA";
const GET_SEARCH = "GET_SEARCH";
const GET_POKEMON_DATA_BASE = "GET_POKEMON_DATA_BASE";
const NEXT = "NEXT"

const reducer = (state, action) => {
    switch(action.type){
        case LOADING:
            return{...state, loading: true };

        case GET_ALL_POKEMON:
            return{...state, allPokemon: action.payload, loading: false }
    }
    return state
}

export const GlobalProvider = ({ children }) => {    

    const baseUrl = 'https://pokeapi.co/api/v2/'

    const initialState = {
        allPokemon: [],
        pokemon: {},
        pokemonDataBase:[],
        searchResults: [],
        next: "",
        loading: false,
    }

    const [state, dispacth] = useReducer(reducer, initialState);
    const [allPokemonData, setallPokemonData] = useState([]);

    const allPokemon = async () => {
        dispacth({ type: "LOADING"});
        const res = await fetch(`${baseUrl}pokemon?limit=20`);
        const data = await res.json();
        dispacth({ type: "GET_ALL_POKEMON", payload: data.results});

        //fetch character data
        const allpokemonData = [];

        for(const pokemon of data.results){
            console.log(pokemon)
            const pokemonRes = await fetch(pokemon.url);
            const pokemonData = await pokemonRes.json();
            allpokemonData.push(pokemonData)
        }

        setallPokemonData(allPokemonData)
    };

    useEffect(() => {
        allPokemon();
    }, []);
    
    return(
        <GlobalContext.Provider value={{
            ...state
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

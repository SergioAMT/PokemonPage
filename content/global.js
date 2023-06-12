import { debounce } from "lodash";
import React, { useContext, useEffect, useReducer } from "react"
import { useState } from "react";

const GlobalContext = React.createContext({});

//ACTION 
const LOADING = "LOADING";
const GET_POKEMON = "GET_POKEMON";
const GET_ALL_POKEMON = "GET_ALL_POKEMON";
const GET_ALL_POKEMON_DATA = "GET_ALL_POKEMON_DATA";
const GET_SEARCH = "GET_SEARCH";
const GET_POKEMON_DATABASE = "GET_POKEMON_DATABASE";
const NEXT = "NEXT"

const reducer = (state, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true };

        case GET_ALL_POKEMON:
            return {
                ...state,
                allPokemon: action.payload,
                loading: false
            };

        case GET_POKEMON:
            return {
                ...state,
                pokemon: action.payload,
                loading: false
            };

        case GET_POKEMON_DATABASE:
            return {
                ...state,
                searchResults: action.payload,
                loading: false
            }

        case GET_SEARCH:
            return{
                ...state,

                loading: false
            }

    }
    return state
}

export const GlobalProvider = ({ children }) => {

    const baseUrl = 'https://pokeapi.co/api/v2/'

    const initialState = {
        allPokemon: [],
        pokemon: {},
        pokemonDataBase: [],
        searchResults: [],
        next: "",
        loading: false,
    }

    const [state, dispacth] = useReducer(reducer, initialState);
    const [allPokemonData, setallPokemonData] = useState([]);

    const allPokemon = async () => {
        dispacth({ type: "LOADING" });
        const res = await fetch(`${baseUrl}pokemon?limit=20`);
        const data = await res.json();
        dispacth({ type: "GET_ALL_POKEMON", payload: data.results });

        //fetch character data
        const allpokemonData = [];

        for (const pokemon of data.results) {
            const pokemonRes = await fetch(pokemon.url);
            const pokemonData = await pokemonRes.json();
            allpokemonData.push(pokemonData)
        }

        setallPokemonData(allpokemonData)
    };

    //get pokemon 
    const getPokemon = async (name) => {
        dispacth({ type: 'LOADING' });

        const res = await fetch(`${baseUrl}pokemon/${name}`);
        const data = await res.json()

        dispacth({ type: 'GET_POKEMON', payload: data })
    };

    //get all pokemon data
    const getPokemoDatabase = async () => {
        dispacth({ type: 'LOADING' });

        const res = await fetch(`${baseUrl}pokemon?limit=100000&offset=0`);
        const data = await res.json();

        dispacth({ type: 'GET_POKEMON_DATABASE', payload: data.results });
    }

    // real time search
    const realTimeSearch = debounce(async (search) => {
        dispacth({ type: 'LOADING' });
        // search pokemon database
        const res = state.pokemonDataBase.filter((pokemon) => {
            return pokemon.name.includes(search)
        })

        dispacth({ type: 'GET_SEARCH', payload: res })

    }, 500)

    useEffect(() => {
        getPokemoDatabase();
        allPokemon();
    }, []);

    return (
        <GlobalContext.Provider value={{
            ...state,
            allPokemonData,
            getPokemon,
            realTimeSearch,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

import React, { useEffect } from 'react'
import { useGlobalContext } from '../../content/global'
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Pokemon() {

    const router = useRouter();

    const { pokemon } = router.query;
    const { getPokemon, loading, pokemon: pokemonItem } = useGlobalContext();

    useEffect(() => {
            getPokemon(pokemon);     
    }, []);

    console.log(pokemonItem)


    return <div>    </div>
}

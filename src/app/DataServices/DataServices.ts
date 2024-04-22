import { IPokémon, ILocation, ISpecies, IEvolution } from "../Interfaces/interface";

export const pokemonApi = async (pokemon:string) => {
    try {
        const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        if (!promise.ok) {
            throw new Error(`HTTP error ${promise.status}`);
        }
        const data: IPokémon = await promise.json()
        return data
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        throw error;
    }
}

export const pokemonSpeciesData = async (species: string) => {
    const promise =  await fetch(species);
    const data: ISpecies = await promise.json();
    return data;
}

export const pokemonEvolveData = async (evolution: string) => {
    const promise = await fetch(evolution);
    const data: IEvolution = await promise.json();
    return data;
}

export const pokemonLocationData = async (pokemonArea: string) => {
    const promise = await fetch(pokemonArea);
    const data: ILocation[] = await promise.json()
    return data;
}

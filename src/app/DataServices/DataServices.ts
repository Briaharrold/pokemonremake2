import { IPokémon, ILocation, ISpecies, IEvolution } from "../Interfaces/interface";

export const pokemonApi = async (pokemon:string) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data: IPokémon = await promise.json()
    return data
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

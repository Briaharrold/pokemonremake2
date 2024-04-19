"use client";
import HeartBtn from "../../public/assets/Vector-2.png";
import Charizard from "../../public/assets/Charizard 1-2.png";
import Favorited from "../../public/assets/Favorited.png";
import { ModalComponent } from "./Components/ModalComopnent";
import { useState, useEffect } from "react";
import {
  pokemonApi,
  pokemonSpeciesData,
  pokemonLocationData,
  pokemonEvolveData,
} from "./DataServices/DataServices";
import {
  IEvolution,
  ILocation,
  IPokémon,
  ISpecies,
  IEvoChainItem,
  IFavorite
} from "./Interfaces/interface";

export default function Home() {
  const [originalPokemon, setOriginalPokemon] = useState(false);
  const [pokeShiny, setPokeShiny] = useState(false);
  const [pokemon, setPokemon] = useState<IPokémon | null>(null);
  const [pokemonLocation, setPokemonLocation] = useState<ILocation[]>([]);
  const [pokemonEvoluton, setPokemonEvolution] = useState<IEvolution[]>([]);
  const [search, setSearch] = useState<string>("");
  const [shinyPokemon, setShinyPokemon] = useState(false);
  const [favorites, setFavorites] = useState<IFavorite[]>([]);
  const [evoChain, setEvoChain] = useState<IEvoChainItem[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchEvoChain = async () => {
      if (pokemonEvoluton.length > 0) {
        const chain : any  = await getEvoChain();
        setEvoChain(chain);
      }
    };
  
    fetchEvoChain();
  }, [pokemonEvoluton, setEvoChain]); 
  useEffect(() => {
    const storedFavorites = getLocalStorage();
    setFavorites(storedFavorites);
  }, []);


  const showPokeImg = () => {

    if (pokeShiny && pokemon?.sprites.other['official-artwork'].front_shiny) {
        return pokemon.sprites.other['official-artwork'].front_shiny
    } else {
        return pokemon?.sprites.other['official-artwork'].front_default;
    }

} 


const handleRemoveFav = (favoriteId: number) => {
  const updatedFavorites = favorites.filter((favorite) => favorite.id !== favoriteId);
  setFavorites(updatedFavorites);
  localStorage.setItem("Favorites", JSON.stringify(updatedFavorites));
  setIsFavorited(false);
};
  function getLocalStorage(): IFavorite[] {
    let localStorageData = localStorage.getItem("Favorites");
    if (localStorageData == null) {
      return [];
    }
    return JSON.parse(localStorageData);
  }

  const handleData = async (fetchedData: IPokémon) => {
    if (fetchedData) {
      setPokemon(fetchedData);

      const data = await pokemonLocationData(
        fetchedData.location_area_encounters
      );
      setPokemonLocation(data);
      const species = await pokemonSpeciesData(fetchedData.species.url);
      const evolution = await pokemonEvolveData(species.evolution_chain.url);
      setPokemonEvolution([evolution]);
    } else {
      alert("please enter pokemons generation 1-5 only!");
    }
  };

  const handlePokeSearch = async () => {
    if (search == "") {
      alert("Please enter a of a pokemon name or number");
    }
    let numberSearch = parseInt(search);
    if (numberSearch == 0) {
      alert("Insert a whole number");
    }
    if (!isNaN(numberSearch) && numberSearch >= 1 && numberSearch <= 650) {
      const fetchedData = await pokemonApi(numberSearch.toString());

      if (fetchedData && fetchedData.id === numberSearch) {
        await handleData(fetchedData);
      } else {
        alert("Type in a Pokémon that is 1-5 Generation!");
      }
    } else {
      const fetchedData = await pokemonApi(search.toLowerCase());

      if (
        fetchedData &&
        fetchedData.name.toLowerCase() === search.toLowerCase()
      ) {
        await handleData(fetchedData);
      } else {
        alert("Type in a Pokémon that is 1-5 Generation!");
      }
    }
  };

  const handleFav = () => {
   
    if (pokemon) {
      const newFavorite: IFavorite = {
        id: pokemon.id,
        name: pokemon.name,
        image: showPokeImg() || "",
      };
  
      // Check if the pokemon already exists in the favorites array
      const isDuplicate = favorites.some((favorite) => favorite.id === newFavorite.id);
  
      if (!isDuplicate) {
        const updatedFavorites = [...favorites, newFavorite];
        setFavorites(updatedFavorites);
        localStorage.setItem("Favorites", JSON.stringify(updatedFavorites));
        setIsFavorited(true);
      }else{
        setIsFavorited(false);
      }
    }
  };

  const getEvoChain = async () => {
    if (pokemonEvoluton.length === 0) {
      return "chain goes here!";
    } else {
      const evoChain = [];
      const baseEvolution = pokemonEvoluton[0].chain;
  
      // Fetch the base evolution sprite
      const baseEvoData = await pokemonApi(baseEvolution.species.name);
      evoChain.push({ name: baseEvolution.species.name, sprite: baseEvoData.sprites.front_default });
  
      // Fetch the sprites for each subsequent evolution
      const fetchEvoSprites = async (evolutions: any) => {
        for (const evolution of evolutions) {
          const evoData = await pokemonApi(evolution.species.name);
          evoChain.push({ name: evolution.species.name, sprite: evoData.sprites.front_default });
  
          if (evolution.evolves_to.length > 0) {
            await fetchEvoSprites(evolution.evolves_to);
          }
        }
      };
  
      await fetchEvoSprites(baseEvolution.evolves_to);
  
      return evoChain;
    }
  };


  return (
    <div className="bg h-screen bg-no-repeat">
      <h1 className="text-center text-5xl font-bold pt-2">Pokedex</h1>
      <div className="flex flex-wrap flex-col-3 justify-center gap-3 pt-2">
        <div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="type number or name"
            className="rounded-lg   lg:w-40 lexendFont font-extralight text-black px-1"
          ></input>
        </div>
        <div>
          <button
            onClick={handlePokeSearch}
            className="lexendFont w-24 cursor-pointer hover:border-blue-400 bg-blue-700 px-2 rounded-lg font-semibold border-transparent"
          >
            search
          </button>
        </div>
        <div>
          <button className="lexendFont w-24 cursor-pointer bg-yellow-400 px-2 rounded-lg font-semibold border-transparent">
            random
          </button>
        </div>
        <div> 
          <ModalComponent favorites={favorites} onRemoveFav={handleRemoveFav}></ModalComponent>
        </div>
      </div>

      <div className="flex flex-col-3 justify-evenly px-0 mx-1 lg:px-96 lg:mx-28 pt-10">
        <div className="">
          <h1 className="text-2xl font-bold">#{pokemon && pokemon.id}</h1>
        </div>
        <div>
          <h1 className="lexendFont text-2xl pt-1 font-bold">
            {pokemon && pokemon.name}
          </h1>
        </div>
        <div className="text-2xl font-bold">
          <button>
            {" "}
            <img
              className="h-5"
              alt="Heart Button"
              onClick={handleFav}
              src={isFavorited ? Favorited.src : HeartBtn.src}
              
            ></img>
          </button>
        </div>
      </div>
      <div className="flex flex-col-6 justify-evenl px-1 mx-1  lg:px-96 lg:mx-52">
        <div className="">
          <h1 className="text-xl font-bold lexendFont">Type:</h1>
          <h1 className="text-xl font-bold lexendFont pt-2">Location:</h1>
          <h1 className="text-xl font-bold lexendFont pt-2">Abilities:</h1>
          <h1 className="text-xl font-bold lexendFont pt-6">Moves:</h1>
        </div>
        <div className="pl-2">
          <h1 className="text-base font-bold lexendFont ">
            {pokemon?.types?.map((type) => type.type.name).join(", ")}
          </h1>
          <h1 className="text-base font-bold lexendFont overflower">
            {pokemonLocation
              ?.map((location) => location.location_area.name)
              .join(", ") || 'N/A'}  
          
          </h1>
          <h1 className="text-base font-bold lexendFont  overflower">
            {pokemon?.abilities
              ?.map((ability) => ability.ability.name)
              .join(", ") || 'N/A'}  
          </h1>
          <h1 className="text-base font-bold lexendFont  overflower">
            {pokemon?.moves?.map((move) => move.move.name).join(", ")}
          </h1>
        </div>
      </div>
      <div className="flex justify-center">
        <img
          className="h-56"
          src={showPokeImg() || Charizard.src}
          alt="Pokemon"
        ></img>
      </div>
      <div className="flex justify-center pt-1">
        <div className="flex justify-center bg-gray-500 rounded-3xl bg-opacity-80 h-fit lg:h-48 w-1/2 px-5">
          <div className="flex justify-center items-center space-x-4">
          <h1 className="text-center text-3xl lexendFont font-bold">
            Evolutions:
          </h1>
          <div className="flex gap-2  mr-4">
      {evoChain.map((evo) => (
        <div key={evo.name} className="flex  flex-col items-center">
          <img src={evo.sprite} alt={evo.name} className="w-20 h-20" />
          <span className="text-2xl lexendFont">{evo.name}</span>
        </div>
      
      ))}
      </div>
    </div>
        </div>
      </div>
    </div>
  );
}


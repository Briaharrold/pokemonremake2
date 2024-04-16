"use client"
import Image from "next/image";
import { Button } from "flowbite-react";
import HeartBtn from "../../public/assets/Vector-2.png";
import Charizard from "../../public/assets/Charizard 1-2.png";
import Favorited from "../../public/assets/Favorited.png";
import { useState,useEffect } from "react";
export default function Home() {
  const  [Fav, setHandleFav] = useState<boolean>(false);
  const handleFav = () => {
    setHandleFav(!Fav)
} 


  return (
    <div className="bg h-screen bg-no-repeat">
      <h1 className="text-center text-5xl font-bold pt-2  ">Pokedex</h1>
      <div className=" flex flex-col-3 justify-center gap-3 pt-2 ">
        <div>
          <input className="rounded-lg w-40 lexendFont font-extralight text-black px-1"></input>
        </div>
        <div>
          <Button className="lexendFont w-24 cursor-pointer hover:border-blue-400 bg-blue-700 px-2 rounded-lg font-semibold border-transparent">
            search
          </Button>
        </div>
        <div>
          <Button className="lexendFont w-24 cursor-pointer bg-yellow-400 px-2 rounded-lg font-semibold border-transparent">
            random
          </Button>
        </div>
        <div>
          <Button className="lexendFont w-24 cursor-pointer bg-red-500 px-2 rounded-lg border-transparent font-semibold">
            favorites
          </Button>
        </div>
      </div>

      <div className="flex flex-col-3 justify-evenly px-96 mx-28 pt-10">
        <div className="">
          <h1 className="text-2xl font-bold">#006</h1>
        </div>
        <div>
          <h1 className="lexendFont text-2xl pt-1 font-bold">Charizard</h1>
        </div>
        <div className="text-2xl font-bold">
          <button>
            {" "}
            <img className="h-5" alt="Heart Button" src={HeartBtn.src}></img>
          </button>
        </div>
      </div>
      <div className="flex flex-col-6 justify-evenly px-96 mx-52 pt-4">
        <div>
          <h1 className="text-xl font-bold lexendFont">Type:</h1>
          <h1 className="text-xl font-bold lexendFont">Location:</h1>
          <h1 className="text-xl font-bold lexendFont">Abilities:</h1>
          <h1 className="text-xl font-bold lexendFont">Moves:</h1>
        </div>
        <div>
          <h1 className="text-xl font-bold lexendFont overflow-scroll">
            Fire,flying
          </h1>
          <h1 className="text-xl font-bold lexendFont overflow-scroll">
            Fire,flying
          </h1>
          <h1 className="text-xl font-bold lexendFont overflow-scroll">
            Fire,flying
          </h1>
          <h1 className="text-xl font-bold lexendFont overflow-scroll">
            Mega-punch,
          </h1>
        </div>
      </div>
      <div className="flex justify-center mt-20">
        <img src={Charizard.src} alt="Pokemon"></img>
      </div>
      <div className="flex justify-center pt-1">
        <div className="flex justify-center bg-gray-500 rounded-3xl bg-opacity-80 h-48 w-1/2 px-5">
          <h1 className="text-center text-3xl lexendFont font-bold ">
            Evolutions:
          </h1>
        </div>
      </div>
    </div>
  );
}

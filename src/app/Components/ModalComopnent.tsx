"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

interface Favorite {
  id: number;
  name: string;
  image: string;
}

interface ModalComponentProps {
  favorites: Favorite[];
  onRemoveFav: (favoriteId: number) => void;
}

export function ModalComponent( {favorites, onRemoveFav}: ModalComponentProps ) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
       <button
          onClick={() => setOpenModal(true)}
            className="lexendFont w-24 cursor-pointer bg-red-500 px-2 rounded-lg border-transparent font-semibold"
          >
            favorites
          </button>
      <Modal className="  bg-black" dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body className=" bg-opacity-90 bg-slate-600">
      <h2 className="text-center text-white font-bold text-3xl ">Favorites</h2>
      <div className="grid grid-cols-3 gap-4">
      {Array.isArray(favorites) &&
              favorites.map((favorite) => (
            <div key={favorite.id} className="flex flex-col items-center">
              <img
                src={favorite.image}
                alt={favorite.name}
                className="w-24 h-24 object-cover mb-2"
              />
              <h3 className="text-lg text-white lexendFont font-semibold">{favorite.name}</h3>
              <button
                    onClick={() => onRemoveFav(favorite.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                  >
                    Remove
                  </button>
            </div>
            
          ))}
          
        </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

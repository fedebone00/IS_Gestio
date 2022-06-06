import Image from "next/image";
import React, { Component } from "react";
import {
  MdFirstPage,
  MdPersonAddAlt1,
  MdPersonRemoveAlt1,
  MdOutlineModeEditOutline,
  MdOutlineEditRoad,
  MdTextFields,
} from "react-icons/md";

const sanityIoImageLoader = ({ src, width, quality }) => {
  return `https://i.imgur.com/2F03Lao.png`;
};

export function SidebarAA() {
  return (
    <div className="flex flex-col fixed left-0 top-0 w-80 h-screen bg-gray-700 text-center gap-6">
      <h1 className=" font-extrabold text-2xl text-gray-400 py-4 mt-4">
        Amministrazione <br></br> Aziendale
      </h1>
      <a href="areaAmministratoreAziendale">
        <h3 className=" text-gray-400 inline-flex items-center justify-center ">
          <MdFirstPage fontSize={20} /> Pagina iniziale
        </h3>
      </a>

      <a href="aggiungiDipendente">
        <h3 className="   text-gray-400 inline-flex items-center justify-center">
          <MdPersonAddAlt1 fontSize={20} />
          Aggiungi dipendente
        </h3>
      </a>
      <a href="rimuoviDipendente">
        <h3 className="   text-gray-400 inline-flex items-center justify-center">
          <MdPersonRemoveAlt1 fontSize={20} />
          Rimuovi dipendente
        </h3>
      </a>
      <a href="modificaInformazioniDipendente">
        <h3 className="   text-gray-400 inline-flex items-start justify-center">
          <MdOutlineModeEditOutline fontSize={20} />
          Modifica informazioni <br></br> dipendente
        </h3>
      </a>
      <a href="modificaDatiAzienda">
        <h3 className="   text-gray-400 inline-flex items-center justify-center">
          <MdOutlineEditRoad fontSize={20} />
          Modifica dati azienda
        </h3>
      </a>
      <a href="gestioneBacheca">
        <h3 className="  text-gray-400 inline-flex items-center justify-center">
          <MdTextFields fontSize={20} />
          Gestione bacheca
        </h3>
      </a>
      <div className="py-96">
        <Image
          loader={sanityIoImageLoader}
          src="image-src"
          alt="GESTIO"
          width={150}
          height={130}
        />
      </div>
    </div>
  );
}

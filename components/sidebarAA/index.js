import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import home from '../../public/home-outline.png'
import React, { Component } from 'react';
import { MdFirstPage, MdPersonAddAlt1, MdPersonRemoveAlt1, MdOutlineModeEditOutline, MdOutlineEditRoad, MdTextFields } from 'react-icons/md';


export function SidebarAA() {
    return (
        <div className="flex flex-col fixed left-0 top-0 w-64 h-screen bg-gray-700 text-center gap-6">
            <h1 className=" font-extrabold text-2xl text-gray-400 py-4 mt-4">Amministrazione Aziendale</h1>
            <a href="areaAmministratoreAziendale">
                <h3 className=" text-gray-400 inline-flex items-center justify-center "><MdFirstPage fontSize={20} /> Pagina iniziale</h3>
            </a>

            <a href="aggiungiDipendente">
                <h3 className="   text-gray-400 inline-flex items-center justify-center"><MdPersonAddAlt1 fontSize={20} />Aggiungi dipendente</h3>
            </a>
            <a href="rimuoviDipendente">
                <h3 className="   text-gray-400 inline-flex items-center justify-center"><MdPersonRemoveAlt1 fontSize={20} />Rimuovi dipendente</h3>
            </a>
            <a href="modificaInformazioniDipendente">
                <h3 className="   text-gray-400 inline-flex items-center justify-center"><MdOutlineModeEditOutline fontSize={20} />Modifica informazioni dipendente</h3>
            </a>
            <a href="modificaDatiAzienda">
                <h3 className="   text-gray-400 inline-flex items-center justify-center"><MdOutlineEditRoad fontSize={20} />Modifica dati azienda</h3>
            </a>
            <a href="gestioneBacheca">
                <h3 className="  text-gray-400 inline-flex items-center justify-center"><MdTextFields fontSize={20} />Gestione bacheca</h3>
            </a>
            <div className='py-96'>
                <Image
                    src="/../public/logo.png"
                    alt="GESTIO"
                    width={150}
                    height={130}
                />
            </div>
        </div>
    )
}

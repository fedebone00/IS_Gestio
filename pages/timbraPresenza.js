import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import home from '../public/home-outline.png'


export default function Home() {
  return (
    <div className="flex flex-col fixed left-0 top-0 w-64 h-screen bg-gray-700 text-center gap-6">
      <div></div>
      <h1 className=" font-extrabold text-2xl text-gray-400 py-4">Area dipendente</h1>
      <a href="login">
        <h3 className= " text-gray-400 ">Pagina iniziale</h3>
      </a>
      <a href="/">
        <h3 className="   text-gray-400 ">Timbra presenze</h3>
      </a>
      <a href="/"> 
        <h3 className="   text-gray-400 ">Gestione ferie</h3>
      </a>
      <a href="/">
        <h3 className="   text-gray-400 ">Notifica malattia</h3>
      </a>
      <a href="/">
        <h3 className="   text-gray-400 ">Contatta colleghi</h3>
      </a>
      <a href="/">
        <h3 className="  text-gray-400 ">Cloud aziendale</h3>
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

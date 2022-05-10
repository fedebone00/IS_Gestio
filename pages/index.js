import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'


export default function Home() {
  return (
    <div className={styles.sidebar}>
      <h1 className={styles.sidebarTitle}>Gestione Azienda</h1>

      <Link href="/" className={styles.sidebarElement1}><a>Pagina Iniziale</a></Link>

    </div>
  )
}

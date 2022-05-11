import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import home from '../public/home-outline.png'


export default function Home() {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <h1 className={styles.sidebarTitle}>Area dipendente</h1>
        </li>
        <li >
          <a href="/login.js">
            <h3 className={styles.sidebarElement1}>Pagina iniziale</h3>
          </a>
        </li>
        <li>
          <a href="/">
            <h3 className={styles.sidebarElement1}>Timbra presenze</h3>
          </a>
        </li>
        <li>

          <a href="/">
            <h3 className={styles.sidebarElement1}>Gestione ferie</h3>
          </a>
        </li>
        <li>
          <a href="/">
            <h3 className={styles.sidebarElement1}>Notifica malattia</h3>
          </a>
        </li>
        <li>
          <a href="/">
            <h3 className={styles.sidebarElement1}>Contatta colleghi</h3>
          </a>
        </li>
        <li>
          <a href="/">
            <h3 className={styles.sidebarElement1}>Cloud aziendale</h3>
          </a>
        </li>
    </ul>

    </div>
  )
}

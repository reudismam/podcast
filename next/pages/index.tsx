import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { Header } from './components/Header'

export default function Home() {
  return (
    <div className={styles.container}>
      <p>Index</p>
    </div>
  )
}

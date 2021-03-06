import '../styles/globals.scss'
import styles from '../styles/Home.module.scss'
import Header from './components/Header'
import Player from './components/Player'

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.appWrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  )
}

export default MyApp

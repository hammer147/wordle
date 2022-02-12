import type { NextPage } from 'next'
import Wordle from '../components/wordle'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Wordle puzzleWord='proxy' />
    </div>
  )
}

export default Home

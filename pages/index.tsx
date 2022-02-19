import type { NextPage } from 'next'
import Wordle from '../components/wordle/wordle'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Wordle />
    </div>
  )
}

export default Home

import styles from '../../styles/wordle.module.css'

type Props = {
  guess: string[]
}

const CurrentGuess = ({ guess }: Props) => {
  return (
    <div className={styles.word}>

      {Array.from({ length: 5 }).map((_, i) => (
        <span className={styles.char} key={i}>{guess[i] ?? ''}</span>
      ))}

    </div>
  )
}

export default CurrentGuess

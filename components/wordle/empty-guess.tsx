import styles from '../../styles/wordle.module.css'

const EmptyGuess = () => {
  return (
    <div className={styles.word}>

      {Array.from({ length: 5 }).map((_, i) => (
        <span className={styles.char} key={i}>{''}</span>
      ))}

    </div>
  )
}

export default EmptyGuess

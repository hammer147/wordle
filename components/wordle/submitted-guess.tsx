import { useGuessChecker } from '../../hooks'
import styles from '../../styles/wordle.module.css'

type Props = {
  submittedGuess: string[]
  puzzleWord: string
  puzzleWordCharCount: Record<string, number>
}

const SubmittedGuess = ({ submittedGuess, puzzleWord, puzzleWordCharCount }: Props) => {

  const checkedGuess = useGuessChecker(submittedGuess, puzzleWord, puzzleWordCharCount)

  return (
    <div className={styles.word}>

      {checkedGuess.map(({ status, guessChar }, i) => {
        const isCorrect = status === 'correct'
        const isPresent = status === 'present'
        return (
          <span
            key={i}
            className={`${styles.char} ${styles.guessedChar} ${isCorrect ? styles.correctChar : ''} ${isPresent ? styles.presentChar : ''}`}
          >
            {guessChar}
          </span>
        )
      })}

    </div>
  )
}

export default SubmittedGuess
